let TelegramBot = require('node-telegram-bot-api');

let token = "YOUR TOKEN";

let fs = require("fs");

let nodemailer = require('nodemailer');

let contents = fs.readFileSync("data.json");
let jsonContent = JSON.parse(contents);

let googleMapsClient = require('@google/maps').createClient({
  key: 'YOUR KEY'
});


let bot = new TelegramBot(token,{
	polling:true,
});

bot.on('message', function(msg){
	let chatId = msg.chat.id;
	switch (msg.text){
		case '/start':
		mainMenu(chatId, msg);
		break;
		case 'Паспорт \u{1F4DC}' :
		case 'Диплом \u{1F4DC}' :
		case 'Справка \u{1F4DC}' :
		case 'Свидетельство \u{1F4DC}':

		language(chatId, msg);

		break;
		case 'Английский \u{1F3F4}\u{E0067}\u{E0062}\u{E0065}\u{E006E}\u{E0067}\u{E007F}':
		case 'Немецкий \u{1F1E9}\u{1F1EA}':
		case 'Чешский \u{1F1E8}\u{1F1FF}':
		case 'Польский \u{1F1F5}\u{1F1F1}':
		checkOut(chatId, msg);
		break;
		case 'Нет, продолжить \u{21AA}':
		price(chatId, jsonContent, msg);
		break;
		case 'Выбрать документ \u{1F4DA}':
		documentType(chatId);
		break;
		case 'Назад к выбору документа \u{1F519}':
		start(chatId, msg);
		break;
		case 'Адрес \u{1F310}':
		location(chatId);
		break;
		case 'Контакты \u{1F4DE}':
		contacts(chatId);
		break;
		case 'Главное меню \u{1F51D}':
		case "Назад в главное меню \u{1F519}":
		mainMenu(chatId);
		break;
		case 'Нотариальное заверение \u{1F516}':
		case 'Апостиль \u{1F3F7}':
		price(chatId, jsonContent, msg);
		break;
		case 'Заказать консультацию \u{2709}':
		chanel(chatId, msg);
		break;
		case 'Телефон \u{1F4DE}':
		case 'E-mail \u{1F4E7}':
		giveCallback(chatId, msg);
		break;
		case 'Подтвердить':
		sending(chatId, msg);
		break;
		case 'Инфо \u{1F50E}':
		info(chatId);
		break;
		case 'Режим работы \u{231A}':
		workdays(chatId);
		break;
		case 'Отзывы \u{1F4AC}':
		reviews(chatId);
		break;
		case 'Личные документы':
		start(chatId, msg);
		break;
		case 'Другой документ':
		language(chatId, msg);
		break;
		
}
});
function mainMenu(chatId, msg){
	bot.sendMessage(chatId, 'Здравствуйте' + " " + '\n' + 'Вас приветствует Бюро Переводов №1 в Беларуси Perevedi.by\n Выберите пункт', {
		reply_markup: JSON.stringify({
			resize_keyboard: true,
			keyboard:[
				['Выбрать документ \u{1F4DA}'], 
				['Инфо \u{1F50E}']
			]
		})
	});
}
function documentType(chatId){
	bot.sendMessage(chatId, "Выберите пункт", {
		reply_markup: JSON.stringify({
			resize_keyboard: true,
			keyboard:[
				['Личные документы'], 
				['Другой документ']
			]
	})
	});
}	
function otherDoc(chatId, msg){
	otherDoc.text = msg.text;
	bot.sendMessage(chatId, 'Введите количество страниц');
	console.log(otherDoc.text);

		bot.once('message', function(msg){
			if(isNaN(msg.text)){
			}
			else{
				priceOtherDoc(chatId, msg, jsonContent);
				info(chatId);
			}
		});
}


function priceOtherDoc(chatId, msg, jsonContent){
	priceOtherDoc.text = msg.text;
	console.log(priceOtherDoc.text);
	let number = Number(priceOtherDoc.text);
	for(let key in jsonContent){
		if(otherDoc.text.includes(key)){
			bot.sendMessage(chatId, "Стоимость перевода " +(jsonContent[key] * number)+ " BYN");
		}
	}
}

function checkOut(chatId, msg){
	if(language.text === 'Другой документ'){
		otherDoc(chatId, msg);
	}
	else{
		islegalization(chatId, msg);
	}
}
function start(chatId, msg){
	start.text = msg.text;
	bot.sendMessage(chatId, 'Выберите документ\n', {
		reply_markup: JSON.stringify({
			resize_keyboard: true,
			keyboard:[
			['Паспорт \u{1F4DC}', 'Диплом \u{1F4DC}'],
			['Справка \u{1F4DC}', 'Свидетельство \u{1F4DC}'],
			['Назад в главное меню \u{1F519}']
			]
		})
	});
}
function language(chatId, msg){
	language.text = msg.text;
	bot.sendMessage(chatId, 'Выберите язык\n', {
		reply_markup: JSON.stringify({
			resize_keyboard: true,
			keyboard:[
			['Английский \u{1F3F4}\u{E0067}\u{E0062}\u{E0065}\u{E006E}\u{E0067}\u{E007F}', 'Немецкий \u{1F1E9}\u{1F1EA}'],
			['Чешский \u{1F1E8}\u{1F1FF}', 'Польский \u{1F1F5}\u{1F1F1}'],
			['Назад к выбору документа \u{1F519}']
			]
		})
	});
}
function islegalization(chatId, msg){
	islegalization.lan = msg.text;
	bot.sendMessage(chatId, 'Вам нужны нотариальное заверение или апостиль?', {
		reply_markup: JSON.stringify({
			resize_keyboard: true,
			keyboard:[
			['Нотариальное заверение \u{1F516}', 'Апостиль \u{1F3F7}'],
			['Нет, продолжить \u{21AA}']
			]
		})
	});
}
function price(chatId, jsonContent, msg){
	price.text = msg.text;
	for(let key in jsonContent){
		if(islegalization.lan.includes(key) && price.text === 'Нет, продолжить \u{21AA}'){
		bot.sendMessage(chatId, 'Стоимость перевода ' + jsonContent[key] + " BYN",{
		reply_markup: JSON.stringify({
			resize_keyboard: true,
			keyboard:[
			['Главное меню \u{1F51D}', 'Заказать консультацию \u{2709}'],
			['Контакты \u{1F4DE}', 'Адрес \u{1F310}']
			]
	})
			});
		}
		else if(price.text.includes(key)){
			let leg = jsonContent[key];
				for(let key in jsonContent){
					if(islegalization.lan.includes(key)){
						bot.sendMessage(chatId, 'Стоимость перевода документа с легализацмей ' + (jsonContent[key] + leg) + " BYN",
						{
							reply_markup: JSON.stringify({
								resize_keyboard: true,
								keyboard:[
								['Главное меню \u{1F51D}', 'Заказать консультацию \u{2709}'],
								['Контакты \u{1F4DE}', 'Адрес \u{1F310}']
								]
	})
			});
					}
					else{

					}
				}
		}
	}
}
function location(chatId){
    	console.log("work");
    	bot.sendMessage(chatId, "Здесь находится наш офис");
        bot.sendVenue(chatId, 53.897218, 27.549455, "Адрес:", "Проспект Независимости 11-Б, офис 505"); 
}
function contacts(chatId){
	bot.sendContact(chatId, "+375291464045", "Perevedi.by");
}
function legalization(chatId, jsonContent, msg){
	for(let key in jsonContent){
		if(msg.text === key){
			bot.sendMessage(chatId, key + " одного документа стоит " + jsonContent[key])
		}
		else{

		}
	}
}
function info(chatId){
	bot.sendMessage(chatId, "Здесь вы можете ознакомиться с информацией о компании",
		{
		reply_markup: JSON.stringify({
			resize_keyboard: true,
			keyboard:[
			['Контакты \u{1F4DE}', 'Адрес \u{1F310}'],
			['Режим работы \u{231A}', 'Отзывы \u{1F4AC}'],
			['Назад в главное меню \u{1F519}']
			]
		})
	});
}
function chanel(chatId, msg){
	bot.sendMessage(chatId, "Выберите удобный способ для связи с Вами", 
		{
		reply_markup: JSON.stringify({
			resize_keyboard: true,
			one_time_keyboard: true,
			keyboard:[
			['Телефон \u{1F4DE}'], 
			['E-mail \u{1F4E7}']
			]
		})
	});
}
function giveCallback (chatId, msg){
	bot.sendMessage(chatId, "Введите Ваши данные"); 
		bot.once('message', function(msg){
				if(isNaN(msg.text)){
					return false;
				}
				else{
				bot.sendMessage(chatId, "Ваша заявка принята");
				info(chatId);
				return sending(chatId,msg);
				}
			});
}
function sending(chatId, msg){
	let from_first = msg.from.first_name;
	let from_last = msg.from.last_name;
	sending.callback = msg.text;


	let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', //your smtp server
    port: 465,
    secure: true, // use TLS
    auth: {
        user: 'e-mail',
        pass: 'pass'
    },
    tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false
    }
});
	
	let mailOptions = {
        from: from_first + " " + from_last, // sender address
        to: 'casa7x@gmail.com', // list of receivers
        subject: 'Zakaz', // Subject line
        text: "Message text", // plain text body
        html: " Вам поступил заказ на консультацию от " + from_first + " " + from_last + " Контакт для связи: " + sending.callback// html body
    };
    transporter.sendMail(mailOptions);
}
function workdays(chatId){

googleMapsClient.place({
  placeid: 'ChIJ3XM3bOjP20YRxexSHtZtYdg',
  language: 'ru'
}, function(err, response) {
  if (!err) {
    let info = response.json;
    console.log(info.result.opening_hours.weekday_text);
    bot.sendMessage(chatId, "График работы:\n" + info.result.opening_hours.weekday_text.join("\n") + " " + "\n");
    
  }
});
}
function reviews(chatId){
googleMapsClient.place({
  placeid: 'ChIJ3XM3bOjP20YRxexSHtZtYdg',
  language: 'ru'
}, function(err, response) {
  if (!err) {
    let info = response.json;
    info.result.reviews.forEach(function(el){
    	if(el.rating > 4){
    		bot.sendMessage(chatId, el.author_name + "\n" + el.text + "\n" + el.relative_time_description);
    	}
    	else{

    	}
    });
  }
});
}
