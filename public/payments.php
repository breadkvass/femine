<?php

function console_log($LEVEL, $text) {
    $date = date('Y-m-d');
    $log = date('Y-m-d H:i:s').' ['.$LEVEL.'] '.__FILE__.' '.$text;
    file_put_contents(__DIR__.'/logs/'.$date.'.log', $log.PHP_EOL, FILE_APPEND);
}

$envPath = __DIR__.'/.env';
if (!file_exists($envPath)) {
    console_log('ERROR', "Configuration file not found");
    header("Location: /");
    die();
}

$envVars = parse_ini_file($envPath);
$requiredVars = ['TBANK_TERMINAL_ID', 'FEMINE_INIT_PAYMENT_URL'];

foreach ($requiredVars as $var) {
    if (empty($envVars[$var])) {
        console_log('ERROR', "Missing required config: $var");
        header("Location: /");
        die();
    }
}
?>

<!doctype html>
<html lang="ru">
    <head>
        <meta charset="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="/favicon.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Феминь!</title>
    </head>
    <body>
        <style>
            .payform-tbank {
                display: -webkit-box;
                display: -ms-flexbox;
                display: flex;
                margin: 2px auto;
                -webkit-box-orient: vertical;
                -webkit-box-direction: normal;
                -ms-flex-direction: column;
                flex-direction: column;
                max-width: 300px;
            }
            .payform-tbank-row {
                margin: 2px;
                border-radius: 4px;
                -webkit-box-flex: 1;
                -ms-flex: 1;
                flex: 1;
                -webkit-transition: 0.3s;
                -o-transition: 0.3s;
                transition: 0.3s;
                border: 1px solid #DFE3F3;
                padding: 15px;
                outline: none;
                background-color: #DFE3F3;
                font-size: 15px;
            }
            .payform-tbank-row:focus {
                background-color: #FFFFFF;
                border: 1px solid #616871;
                border-radius: 4px;
            }
            .payform-tbank-btn {
                background-color: #FBC520;
                border: 1px solid #FBC520;
                color: #3C2C0B;
            }
            .payform-tbank-btn:hover {
                background-color: #FAB619;
                border: 1px solid #FAB619;
            }
        </style>
        <form class="payform-tbank" name="payform-tbank" id="payform-tbank">
            <input class="payform-tbank-row" type="hidden" name="terminalkey" value="TBankTest">
            <input class="payform-tbank-row" type="hidden" name="frame" value="false">
            <input class="payform-tbank-row" type="hidden" name="language" value="ru">
            <input class="payform-tbank-row" type="hidden" name="receipt" value="">
            <input class="payform-tbank-row" type="text" placeholder="Сумма заказа" name="amount" required>
            <input class="payform-tbank-row" type="hidden" placeholder="Номер заказа" name="order">
            <input class="payform-tbank-row" type="text" placeholder="Описание заказа" name="description">
            <input class="payform-tbank-row" type="text" placeholder="ФИО плательщика" name="name">
            <input class="payform-tbank-row" type="email" placeholder="E-mail" name="email">
            <input class="payform-tbank-row" type="tel" placeholder="Контактный телефон" name="phone">
            <br/>
            <div id="paymentContainer"></div>
        </form>
        <script>
        const URL = '<?= $envVars['FEMINE_INIT_PAYMENT_URL'] ?>';
        const INIT_PARAMS = {
            get orderId() {
                return `${Date.now()}${Math.floor(Math.random() * 100)}`; // Случайное число, используется для примера
            }
        };
        </script>
        <script async onload="onPaymentIntegrationLoad()" src="https://acq-paymentform-integrationjs.t-static.ru/integration.js"></script>
        <script>
        const initConfig = {
            terminalKey: '<?= $envVars['TBANK_TERMINAL_ID'] ?>',
            product: 'eacq',
            features: {
                payment: {},
            },
        };
        
        function onPaymentIntegrationLoad() {
            PaymentIntegration.init(initConfig)
            .then(async (integration) => {
                const mainPaymentIntegration = await integration.payments.create('femine-dev-payment', {}); 
        
                const container = document.getElementById('paymentContainer');
                await mainPaymentIntegration.mount(container);
        
                await integration.payments.setPaymentStartCallback(async () => {
                    const res = await new PaymentIntegration.Helpers().request(URL, 'POST', INIT_PARAMS);
                    return res.paymentUrl;
                });
        
                const widgetTypes = ['bnpl', 'sbp', 'tpay'];
                await mainPaymentIntegration.updateWidgetTypes(widgetTypes); 
            })
            .catch();
        }
        </script>
    </body>
</html>