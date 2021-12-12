"use strict";

const title = document.getElementsByTagName("h1")[0].innerText;
const handlerBtn = document.getElementsByClassName("handler_btn")[0];
const buttonPlus = document.querySelector(".screen-btn");
const otherItemsPersent = document.querySelectorAll(".other-items.percent");
const otherItemsNumber = document.querySelectorAll(".other-items.number");
const inputTypeRange = document.querySelector(".rollback [type='range']");
const spanRangeValue = document.querySelector(".rollback .range-value");
const totalInput = Array.from(document.getElementsByClassName("total-input"));
const total = totalInput[0];
const totalCount = totalInput[1];
const totalCountOther = totalInput[2];
const fullTotalCount = totalInput[3];
const totalCountRollBack = totalInput[4];
let screens = document.querySelectorAll(".screen");

const appData = {
    title: "",
    screens: [],
    screensCount: 0,
    screenPrice: 0,
    rollback: 0,
    adaptive: true,
    servicePricesPercent: 0,
    servicePricesNumber: 0,
    fullPrice: 0,
    servicePercentPrice: 0,
    servicesPersent: {},
    servicesNumber: {},
    isError: true,
    validateFields: function () {
        screens = document.querySelectorAll(".screen");
        appData.isError = true;
        let checkErrorAllFields = [];
        screens.forEach(function (screen, index) {
            const select = screen.querySelector("select");
            const input = screen.querySelector("input");
            const selectName = select.options[select.selectedIndex].textContent;
            if (selectName === "Тип экранов" || !input.value) {
                checkErrorAllFields = [...checkErrorAllFields, false];
            }
        });
        if (checkErrorAllFields.includes(false)) {
            appData.isError = true;
            alert("Заполните обязательные поля");
        } else {
            appData.isError = false;
        }
    },
    init: function () {
        appData.addTitle();
        handlerBtn.addEventListener("click", appData.start);
        buttonPlus.addEventListener("click", appData.addScreensBlock);
        inputTypeRange.addEventListener("change", appData.addRollBack);
        inputTypeRange.addEventListener("input", appData.addRollBack);
    },
    start: function () {
        appData.validateFields();
        if (!appData.isError) {
            appData.addScreens();
            appData.addServices();
            appData.addPrices();
            appData.showResult();
        }
    },
    addTitle: function () {
        document.title = title;
    },
    showResult: function () {
        total.value = appData.screenPrice;
        totalCountOther.value =
            appData.servicePricesPercent + appData.servicePricesNumber;
        fullTotalCount.value = appData.fullPrice;
        totalCountRollBack.value = appData.servicePercentPrice;
        totalCount.value = appData.screensCount;
    },
    addScreens: function () {
        screens = document.querySelectorAll(".screen");
        screens.forEach(function (screen, index) {
            const select = screen.querySelector("select");
            const input = screen.querySelector("input");
            const selectName = select.options[select.selectedIndex].textContent;
            appData.screens = [
                ...appData.screens,
                {
                    id: index,
                    name: selectName,
                    price: Number(select.value) * Number(input.value),
                    count: Number(input.value),
                },
            ];
        });
    },
    addServices: function () {
        otherItemsPersent.forEach(function (item) {
            const check = item.querySelector("input[type=checkbox]");
            const label = item.querySelector("label");
            const input = item.querySelector("input[type=text]");
            if (check.checked) {
                appData.servicesPersent[label.textContent] = Number(
                    input.value,
                );
            }
        });
        otherItemsNumber.forEach(function (item) {
            const check = item.querySelector("input[type=checkbox]");
            const label = item.querySelector("label");
            const input = item.querySelector("input[type=text]");
            if (check.checked) {
                appData.servicesNumber[label.textContent] = Number(input.value);
            }
        });
    },
    addScreensBlock: function () {
        const cloneScreen = screens[0].cloneNode(true);
        screens[screens.length - 1].after(cloneScreen);
    },
    addRollBack: function (event) {
        appData.rollback = Number(event.currentTarget.value);
        spanRangeValue.textContent = event.currentTarget.value;
        if (appData.fullPrice) {
            appData.servicePercentPrice = Math.ceil(
                appData.fullPrice -
                    appData.fullPrice * (appData.rollback / 100),
            );
            appData.showResult();
        }
    },
    addPrices: function () {
        for (let screen of appData.screens) {
            appData.screenPrice += Number(screen.price);
        }
        for (let key in appData.servicesNumber) {
            appData.servicePricesNumber += Number(appData.servicesNumber[key]);
        }
        for (let key in appData.servicesPersent) {
            appData.servicePricesPercent +=
                appData.screenPrice * (appData.servicesPersent[key] / 100);
        }
        appData.fullPrice =
            appData.screenPrice +
            appData.servicePricesNumber +
            appData.servicePricesPercent;
        appData.servicePercentPrice = Math.ceil(
            appData.fullPrice - appData.fullPrice * (appData.rollback / 100),
        );
        if (appData.screens.length > 1) {
            appData.screens.reduce(function (acc, item) {
                const result = acc.count + item.count;
                appData.screensCount = result;
            });
        } else {
            appData.screensCount = appData.screens[0].count;
        }
    },
    logger: function () {
        console.log(appData.fullPrice);
        console.log(appData.servicePercentPrice);
        for (let key in appData) {
            console.log(appData[key]);
        }
    },
};
appData.init();
