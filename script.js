"use strict";
let title = prompt("Как называется Ваш проект?"),
    screens = prompt("Какие типы экранов нужно разработать?"),
    screenPrice = Number(prompt("Сколько будет стоить данная работа?")),
    rollback = 10,
    fullPrice = 1000000,
    adaptive = confirm("Нужен ли адаптив на сайте?"),
    service1 = prompt("Какой дополнительный тип услуги нужен?"),
    servicePrice1 = Number(prompt("Сколько это будет стоить?")),
    service2 = prompt("Какой дополнительный тип услуги нужен?"),
    servicePrice2 = Number(prompt("Сколько это будет стоить?")),
    total = screenPrice + servicePrice1 + servicePrice2,
    servicePercentPrice = Math.ceil(total - total * (rollback / 100));
// alert("Hello World");
// console.log("Hi!");

// console.log(typeof title, typeof fullPrice, typeof adaptive);
// console.log(screens.length);
// console.log(
//     `Стоимость верстки экранов ${screenPrice} рублей/долларов/гривен/юани \nСтоимость разработки сайта ${fullPrice} рублей/долларов/гривен/юани`,
// );
// console.log(screens.toLowerCase().split());
// console.log(fullPrice * (rollback / 100));
console.log(title);
console.log(screens);
console.log(screenPrice);
console.log(adaptive);
console.log(service1);
console.log(servicePrice1);
console.log(service2);
console.log(servicePrice2);
console.log(total);
console.log(servicePercentPrice);

if (total > 30000) {
    console.log("Даем скидку в 10%");
} else if (total > 15000 && total < 30000) {
    console.log("Даем скидку в 5%");
} else if (total > 0 && total < 15000) {
    console.log("Скидка не предусмотрена");
} else if (total < 0) {
    console.log("Что-то пошло не так");
}
