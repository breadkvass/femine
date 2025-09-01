<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Ручной парсинг .env
$envPath = __DIR__ . '/.env';
if (!file_exists($envPath)) {
    http_response_code(500);
    die(json_encode(['error' => 'Configuration file not found']));
}

$envVars = parse_ini_file($envPath);
$requiredVars = ['TELEGRAM_BOT_TOKEN', 'TELEGRAM_CHAT_ID'];

foreach ($requiredVars as $var) {
    if (empty($envVars[$var])) {
        http_response_code(500);
        die(json_encode(['error' => "Missing required config: $var"]));
    }
}

// Получаем данные из формы
$data = json_decode(file_get_contents('php://input'), true);

// Валидация данных
$errors = [];
if (empty($data['name'])) $errors[] = 'Поле "Имя" обязательно для заполнения';
if (empty($data['telegram'])) $errors[] = 'Поле "Telegram" обязательно для заполнения';

if (!empty($errors)) {
    http_response_code(400);
    die(json_encode(['errors' => $errors]));
}

// Функция для экранирования Markdown-символов
function escapeMarkdown($text) {
    $chars = ['_', '*', '[', ']', '(', ')', '~', '`', '>', '#', '+', '-', '=', '|', '{', '}', '.', '!'];
    return str_replace($chars, array_map(function($char) { return "\\$char"; }, $chars), $text);
}

// Формируем сообщение для Telegram
$message = "📌 *Новая заявка на мероприятие*\n\n"
    . "*Встреча:* " . escapeMarkdown($data['event']) . "\n"
    . "*Имя:* " . escapeMarkdown($data['name']) . "\n"
    . "*Старше 18:* " . ($data['isAdult']) . "\n"
    . "*Telegram:* " . escapeMarkdown($data['telegram']) . "\n";

// Отправка в Telegram
$telegramUrl = "https://api.telegram.org/bot{$envVars['TELEGRAM_BOT_TOKEN']}/sendMessage";
$postData = [
    'chat_id' => $envVars['TELEGRAM_CHAT_ID'],
    'text' => $message,
    'parse_mode' => 'MarkdownV2',
    'disable_web_page_preview' => true
];

$ch = curl_init();
curl_setopt_array($ch, [
    CURLOPT_URL => $telegramUrl,
    CURLOPT_POST => true,
    CURLOPT_POSTFIELDS => $postData,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_SSL_VERIFYPEER => false,
    CURLOPT_TIMEOUT => 10
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($httpCode !== 200) {
    error_log("Telegram API Error: " . print_r($response, true));
    http_response_code(500);
    die(json_encode(['error' => 'Ошибка при отправке данных']));
}

echo json_encode(['success' => true]);