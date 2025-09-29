<?php

function console_log($LEVEL, $text)
{
  $date = date('Y-m-d');
  $log = date('Y-m-d H:i:s') . ' [' . $LEVEL . '] ' . __FILE__ . ' ' . $text;
  file_put_contents(__DIR__ . '/logs/' . $date . '.log', $log . PHP_EOL, FILE_APPEND);
}

$envPath = __DIR__ . '/.env';
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
  <title>Феминь! donation</title>
</head>

<body>
  <style>
    html,
    body {
      margin: 0;
      padding: 0;
      width: 100%;
      height: 100%;
    }

    .container {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      flex-wrap: nowrap;
      justify-content: center;
      align-items: center;
    }

    .payform-tbank {
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      margin: 2px auto;
      -webkit-box-orient: vertical;
      -webkit-box-direction: normal;
      -ms-flex-direction: column;
      flex-direction: column;
      max-width: 250px;
    }

    .payform-tbank input,
    .payform-tbank button {
      margin: 3px;
      border-radius: 5px;
      -webkit-box-flex: 1;
      -ms-flex: 1;
      flex: 1;
      -webkit-transition: 0.3s;
      -o-transition: 0.3s;
      transition: 0.3s;
      border: 1px solid #DFE3F3;
      padding: 8px;
      outline: none;
      background-color: #DFE3F3;
      font-size: 15px;
    }

    .payform-tbank input:focus {
      background-color: #FFFFFF;
      border: 1px solid #616871;
      border-radius: 6px;
    }

    .payform-tbank button {
      margin-top: 9px;
      background-color: #FBC520;
      border: 1px solid #FBC520;
      color: #3C2C0B;
    }

    .payform-tbank button:hover {
      background-color: #FAB619;
      border: 1px solid #FAB619;
    }
  </style>

  <script src="https://securepay.tinkoff.ru/html/payForm/js/tinkoff_v2.js"></script>
  <div class="container">
    <form class="payform-tbank" name="payform-tbank" id="payform-tbank">
      <input name="receipt" type="hidden" value="">
      <input name="terminalkey" type="hidden" value="<?= $envVars['TBANK_TERMINAL_ID'] ?>">
      <input name="frame" type="hidden" value="false">
      <input name="language" type="hidden" value="ru">
      <input name="description" type="hidden" value="Мероприятие">
      <input name="order" type="hidden" placeholder="Номер заказа">
      <input name="amount" type="text" placeholder="Сумма заказа" required>
      <input name="name" type="text" placeholder="Имя">
      <input name="email" type="email" placeholder="E-mail">
      <input name="phone" type="tel" placeholder="Контактный телефон" hidden disabled>
      <button type="submit">Оплатить</button>
    </form>
    <form class="payform-tbank" id="payform-hack" style="display: none">
      <button type="submit">Проверка</button>
    </form>
  </div>

  <script type="text/javascript">
    document.getElementById("payform-hack").addEventListener("submit", function (e) {
      e.preventDefault();
      fetch("https://securepay.tinkoff.ru/v2/Init", {
        headers: {
          "accept": "application/json, text/plain, */*",
          "accept-language": "ru,en;q=0.9",
          "content-type": "application/json",
          "sec-ch-ua": "\"Chromium\";v=\"136\", \"YaBrowser\";v=\"25.6\", \"Not.A/Brand\";v=\"99\", \"Yowser\";v=\"2.5\"",
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": "\"Windows\"",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "cross-site",
          "x-init": "tinkoffjs"
        },
        referrer: "https://femine.space/",
        referrerPolicy: "strict-origin-when-cross-origin",
        body: "{\"Amount\":900,\"Description\":\"Мероприятие\",\"Frame\":false,\"OrderId\":\"1753746007844f\",\"TerminalKey\":\"1752606234569\",\"DATA\":{\"connection_type\":\"Widget2.0\",\"Email\":\"xxx@yandex.ru\",\"Name\":\"xxx\"},\"Language\":\"ru\",\"Receipt\":{\"Taxation\":\"usn_income_outcome\",\"FfdVersion\":\"1.2\",\"Items\":[{\"Name\":\"Мероприятие\",\"Price\":900,\"Quantity\":1,\"Amount\":900,\"PaymentMethod\":\"full_payment\",\"PaymentObject\":\"service\",\"Tax\":\"none\",\"MeasurementUnit\":\"ед.\"}],\"Email\":\"xxxx@yandex.ru\"}}",
        method: "POST",
        mode: "cors",
        credentials: "omit"
      }).then(res => {
        console.log(res);
        return res.text();
      }).then(res => {
        console.log(res);
      });

    });
  </script>

  <script type="text/javascript">
    const TPF = document.getElementById("payform-tbank");
    TPF.addEventListener("submit", function (e) {
      e.preventDefault();
      const {
          description,
          amount,
          email,
          phone,
          // receipt
      } = TPF;

      if (!email.value && !phone.value) {
        return alert("Поле E-mail или Phone не должно быть пустым");
      }

      TPF.receipt.value = JSON.stringify({
          "Taxation": "usn_income_outcome",
          "FfdVersion": "1.2",
          "Items": [{
              "Name": description.value || "Оплата",
              "Price": Math.round(amount.value * 100),
              "Quantity": 1.00,
              "Amount": Math.round(amount.value * 100),
              "PaymentMethod": "full_payment",
              "PaymentObject": "service",
              "Tax": "none",
              "MeasurementUnit": "ед."
          }]
      });

      // if (receipt) {

      //     // "EmailCompany": "mail@mail.com", 
      // }

      pay(TPF);
    })
  </script>
  
  <script type="text/javascript">

    // jsfiddle fix
    // if (!String.prototype.contains) {
    //     String.prototype.contains = {
    //         contains(str) {
    //             return this.indexOf(str) !== -1;
    //         }
    //     }.contains;
    // }

    // const DEFAULT_LABEL = 'Phone or e-mail';
    // const DEFAULT_TYPE = 'text';
    // new Vue({
    //     el: '#app',
    //     data: () => ({
    //         label: DEFAULT_LABEL,
    //         type: DEFAULT_TYPE,
    //         value: ''
    //     }),
    //     methods: {
    //         onInput(e) {
    //             setTimeout(() => {
    //                 console.log(e.target.value = this.value);
    //             }, 100);
    //             const { value } = e.target;
    //             const normalizedValue = value.trim().toLowerCase();
    //             if (normalizedValue === '') {
    //                 return this.reset();
    //             }
    //             const firstChar = normalizedValue.charAt(0);
    //             const firstCharCode = normalizedValue.charCodeAt(0);
    //             if (firstChar === '+' || isNumberChar(firstCharCode)) {
    //                 return this.checkPhone(normalizedValue);
    //             }
    //             if (isLetterChar(firstCharCode)) {
    //                 return this.checkEmail(normalizedValue);
    //             }
    //             this.reset();
    //         },
    //         reset() {
    //             this.value = '';
    //             this.type = DEFAULT_TYPE;
    //             this.label = DEFAULT_LABEL;
    //         },
    //         checkPhone(value, target) {
    //             this.type = 'phone';
    //             this.label = 'Phone';
    //             this.value = formatPhone(value);
    //         },
    //         checkEmail(value) {
    //             this.type = 'email';
    //             this.label = 'Email';
    //             this.value = formatEmail(value);
    //         }
    //     }
    // });

    // function formatPhone(value) {
    //     // тут только для России, другие форматы доделывайте сами
    //     const validChars = [...value.slice(value.startsWith('+7')
    //         ? 2
    //         : ('+78'.contains(value[0])
    //             ? 1
    //             : 0
    //         )
    //     )].filter(char => isNumberChar(char.charCodeAt(0))).slice(0, 10).join('');
    //     return '+7' + (len => {
    //         switch (true) {
    //             case len < 3:
    //                 return '(' + validChars;
    //             case len < 6:
    //                 return `(${validChars.slice(0, 3)}) ${validChars.slice(3)}`;
    //             case len < 8:
    //                 return `(${validChars.slice(0, 3)}) ${validChars.slice(3, 6)}-${validChars.slice(6)}`;
    //             default:
    //                 return `(${validChars.slice(0, 3)}) ${validChars.slice(3, 6)}-${validChars.slice(6, 8)}-${validChars.slice(8)}`;
    //         }
    //     })(validChars.length)
    // }

    // function formatEmail(value) {
    //     const [user, domen] = value.split('@').map(normalizeEmailChunk);
    //     return user + (typeof domen === 'undefined'
    //         ? ''
    //         : '@' + domen
    //     );
    // }

    // function normalizeEmailChunk(emailChunk, chunkIndex) {
    //     const validAdditionalChars = chunkIndex === 0 ? '.+-' : '.-';
    //     return ([...emailChunk]
    //         .filter((char, i) => validAdditionalChars.contains(char)
    //             || isLetterChar(char.charCodeAt(0))
    //             || (i !== 0 && isNumberChar(char.charCodeAt(0)))
    //         ).join('')
    //     );
    // }
    // console.log(''.contains)
    // function isNumberChar(charCode) { // 0-9
    //     return charCode >= 48 && charCode <= 57;
    // }

    // function isLetterChar(charCode) { // a-z
    //     return charCode >= 97 && charCode <= 122
    // }
  </script>

</body>

</html>