"use strict";

const appData = {
    title: "",
    screens: "",
    screenPrice: 0,
    rollback: 10,
    adaptive: true,
    allServicePrices: 0,
    fullPrice: 0,
    servicePercentPrice: 0,
    service1: "",
    service2: "",
    isNumber: function (num) {
        if (!/\s/.test(num)) {
            return !isNaN(parseFloat(num)) && isFinite(num);
        }
        return false;
    },
    asking: function () {
        appData.title = prompt("Как называется Ваш проект?");

        appData.screens = prompt("Какие типы экранов нужно разработать?");

        do {
            appData.screenPrice = prompt("Сколько будет стоить данная работа?");
        } while (!appData.isNumber(appData.screenPrice));

        appData.adaptive = confirm("Нужен ли адаптив на сайте?");
    },
    getAllServicePrices: function () {
        let sum = 0;
        for (let i = 0; i < 2; i++) {
            let price;
            if (i === 0) {
                appData.service1 = prompt(
                    "Какой дополнительный тип услуги нужен?",
                );
            } else if (i === 1) {
                appData.service2 = prompt(
                    "Какой дополнительный тип услуги нужен?",
                );
            }
            while (!appData.isNumber(price)) {
                price = prompt("Сколько это будет стоить?");
            }
            sum += Number(price);
        }
        return sum;
    },
    getFullPrice: function (screenPrice, allServicePrices) {
        return Number(screenPrice) + Number(allServicePrices);
    },
    getTitle: function () {
        let firstLetter = appData.title.trim().split("")[0].toUpperCase();
        let otherLetter = appData.title.slice(1).toLowerCase();
        let result = firstLetter + otherLetter;
        return result;
    },
    getServicePercentPrices: function () {
        return Math.ceil(
            appData.fullPrice - appData.fullPrice * (appData.rollback / 100),
        );
    },
    getRollBackMessage: function (price) {
        if (price > 30000) {
            return "Даем скидку в 10%";
        } else if (price > 15000 && price < 30000) {
            return "Даем скидку в 5%";
        } else if (price > 0 && price < 15000) {
            return "Скидка не предусмотрена";
        } else if (price < 0) {
            return "Что-то пошло не так";
        }
    },
    logger: function () {
        console.log(appData.fullPrice);
        console.log(appData.servicePercentPrice);
        for (let key in appData) {
            console.log(appData[key]);
        }
    },
    start: function () {
        appData.asking();
        appData.allServicePrices = appData.getAllServicePrices();
        appData.fullPrice = appData.getFullPrice(
            appData.screenPrice,
            appData.allServicePrices,
        );
        appData.servicePercentPrice = appData.getServicePercentPrices();
        appData.title = appData.getTitle();
        appData.logger();
    },
};

appData.start();
