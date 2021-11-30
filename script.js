"use strict";
let title = prompt("Как называется Ваш проект?"),
    screens = prompt("Какие типы экранов нужно разработать?"),
    screenPrice = Number(prompt("Сколько будет стоить данная работа?")),
    rollback = 10,
    adaptive = confirm("Нужен ли адаптив на сайте?"),
    service1 = prompt("Какой дополнительный тип услуги нужен?"),
    servicePrice1 = Number(prompt("Сколько это будет стоить?")),
    service2 = prompt("Какой дополнительный тип услуги нужен?"),
    servicePrice2 = Number(prompt("Сколько это будет стоить?"));

const getAllServicePrices = function () {
    return servicePrice1 + servicePrice2;
};

let allServicePrices = getAllServicePrices();

function getFullPrice(screenPrice, allServicePrices) {
    return screenPrice + allServicePrices;
}
let fullPrice = getFullPrice(screenPrice, allServicePrices);

function getTitle() {
    let firstLetter = title.trim().split("")[0].toUpperCase();
    let otherLetter = title.slice(1).toLowerCase();
    let result = firstLetter + otherLetter;
    return result;
}

function getServicePercentPrices() {
    return Math.ceil(fullPrice - fullPrice * (rollback / 100));
}
const servicePercentPrice = getServicePercentPrices();

const showTypeOf = function (variable) {
    console.log(variable, typeof variable);
};

const getRollBackMessage = function (price) {
    if (price > 30000) {
        return "Даем скидку в 10%";
    } else if (price > 15000 && price < 30000) {
        return "Даем скидку в 5%";
    } else if (price > 0 && price < 15000) {
        return "Скидка не предусмотрена";
    } else if (price < 0) {
        return "Что-то пошло не так";
    }
};

showTypeOf(title);
showTypeOf(screenPrice);
showTypeOf(adaptive);

console.log(screens.split(""));
console.log(getRollBackMessage(fullPrice));
console.log(allServicePrices);
console.log(fullPrice);
console.log(getTitle());
console.log(servicePercentPrice);
