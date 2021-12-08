"use strict";

const appData = {
    title: "",
    screens: [],
    screenPrice: 0,
    rollback: 10,
    adaptive: true,
    allServicePrices: 0,
    fullPrice: 0,
    servicePercentPrice: 0,
    services: {},
    isNumber: function (num) {
        if (!/\s/.test(num)) {
            return !isNaN(parseFloat(num)) && isFinite(num);
        }
        return false;
    },
    isString: function (str) {
        if (Number(str)) {
            return true;
        } else {
            return false;
        }
    },
    asking: function () {
        let nameProject;
        do {
            nameProject = prompt("Как называется Ваш проект?");
        } while (appData.isString(nameProject));
        appData.title = nameProject;

        for (let i = 0; i < 2; i++) {
            let name;
            do {
                name = prompt("Какие типы экранов нужно разработать?");
            } while (appData.isString(name));
            let price = 0;

            do {
                price = prompt("Сколько будет стоить данная работа?");
            } while (!appData.isNumber(price));

            appData.screens.push({ id: i, name: name, price: price });
        }

        for (let i = 0; i < 2; i++) {
            let name;
            let price;

            do {
                name = prompt("Какой дополнительный тип услуги нужен?");
            } while (appData.isString(name));

            while (!appData.isNumber(price)) {
                price = prompt("Сколько это будет стоить?");
            }
            appData.services[`${name}${i}`] = Number(price);
        }

        appData.adaptive = confirm("Нужен ли адаптив на сайте?");
    },
    addPrices: function () {
        appData.screens.reduce(function (acc, current) {
            return acc + current;
        });

        for (let key in appData.services) {
            appData.allServicePrices += appData.services[key];
        }
    },
    getFullPrice: function (screenPrice, allServicePrices) {
        appData.fullPrice = Number(screenPrice) + Number(allServicePrices);
    },
    getTitle: function () {
        let firstLetter = appData.title.trim().split("")[0].toUpperCase();
        let otherLetter = appData.title.slice(1).toLowerCase();
        let result = firstLetter + otherLetter;
        appData.title = result;
    },
    getServicePercentPrices: function () {
        appData.servicePercentPrice = Math.ceil(
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
        // for (let key in appData) {
        //     console.log(appData[key]);
        // }
        console.log(appData.screens);
        console.log(appData.services);
    },
    start: function () {
        appData.asking();
        appData.addPrices();
        appData.getFullPrice(appData.screenPrice, appData.allServicePrices);
        appData.getServicePercentPrices();
        appData.getTitle();
        appData.logger();
    },
};

appData.start();
