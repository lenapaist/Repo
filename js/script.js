"use strict";

const title = document.getElementsByTagName("h1")[0].innerText;
const handlerBtn = document.getElementsByClassName("handler_btn")[0];
const resetBtn = document.getElementById("reset");
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
const cmsOpen = document.getElementById("cms-open");
const optionsCms = document.querySelector(".hidden-cms-variants");
const dopOptionsCmsBlock = document.querySelector(
    ".hidden-cms-variants > .main-controls__input",
);
const allCheckboxElements = document.querySelectorAll(
    ".main-controls__views.element input[type=checkbox]",
);
let cmsSelect = document.getElementById("cms-select");
let cmsOtherInput = document.getElementById("cms-other-input");
let allEnterControlElemenst = document.querySelectorAll(
    ".main-controls__item.screen input[type=text]",
);
let allSelectControlElements = document.querySelectorAll(
    ".main-controls select",
);
let screens = document.querySelectorAll(".screen");

let appData = {
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
    servicesCMSPercent: 0,
    isError: true,
    validateFields: function () {
        screens = document.querySelectorAll(".screen");
        this.isError = true;
        let checkErrorAllFields = [];
        screens.forEach((screen, index) => {
            const select = screen.querySelector("select");
            const input = screen.querySelector("input");
            const selectName = select.options[select.selectedIndex].textContent;
            if (selectName === "Тип экранов" || !input.value) {
                checkErrorAllFields = [...checkErrorAllFields, false];
            }
        });
        if (checkErrorAllFields.includes(false)) {
            this.isError = true;
            alert("Заполните обязательные поля");
        } else {
            this.isError = false;
        }
    },
    init: function () {
        appData.addTitle();
        handlerBtn.addEventListener("click", this.start);
        buttonPlus.addEventListener("click", this.addScreensBlock);
        cmsOpen.addEventListener("change", this.checkDopOptions);
        cmsSelect.addEventListener("change", this.getServiceOtherCMSPertsent);
        inputTypeRange.addEventListener("change", this.addRollBack);
        inputTypeRange.addEventListener("input", this.addRollBack);
        resetBtn.addEventListener("click", this.reset);
    },
    start: function () {
        appData.validateFields();
        if (!appData.isError) {
            allEnterControlElemenst.forEach((item) =>
                item.setAttribute("disabled", true),
            );
            allSelectControlElements.forEach((item) =>
                item.setAttribute("disabled", true),
            );
            cmsOtherInput.setAttribute("disabled", true);
            appData.addScreens();
            appData.addServices();
            appData.addPrices();
            appData.showResult();
            handlerBtn.style.display = "none";
            resetBtn.style.display = "flex";
        }
    },
    reset: function () {
        screens = document.querySelectorAll(".screen");

        allEnterControlElemenst.forEach((item) => {
            item.removeAttribute("disabled");
            item.value = "";
        });
        allSelectControlElements.forEach((item) => {
            item.removeAttribute("disabled");
            item.value = "";
        });
        allCheckboxElements.forEach((item) => (item.checked = false));
        cmsOtherInput.removeAttribute("disabled");
        cmsOtherInput.value = "";
        for (let i = 1; i <= screens.length - 1; i++) {
            screens[i].remove();
        }
        optionsCms.style.display = "none";
        dopOptionsCmsBlock.style.display = "none";
        handlerBtn.style.display = "flex";
        resetBtn.style.display = "none";
        appData = {
            ...appData,
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
            servicesCMSPercent: 0,
            isError: true,
        };
    },
    addTitle: function () {
        document.title = title;
    },
    checkDopOptions: function (event) {
        event.target.checked
            ? (optionsCms.style.display = "flex")
            : (optionsCms.style.display = "none");
    },
    getServiceOtherCMSPertsent: function (event) {
        event.target.value === "other"
            ? (dopOptionsCmsBlock.style.display = "flex")
            : (dopOptionsCmsBlock.style.display = "none");
    },
    showResult: function () {
        total.value = this.screenPrice;
        totalCountOther.value =
            this.servicePricesPercent + this.servicePricesNumber;
        fullTotalCount.value = this.fullPrice;
        totalCountRollBack.value = this.servicePercentPrice;
        totalCount.value = this.screensCount;
    },
    addScreens: function () {
        screens = document.querySelectorAll(".screen");
        screens.forEach((screen, index) => {
            const select = screen.querySelector("select");
            const input = screen.querySelector("input");
            const selectName = select.options[select.selectedIndex].textContent;
            this.screens = [
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
        cmsSelect = document.getElementById("cms-select");
        cmsOtherInput = document.getElementById("cms-other-input");
        otherItemsPersent.forEach((item) => {
            const check = item.querySelector("input[type=checkbox]");
            const label = item.querySelector("label");
            const input = item.querySelector("input[type=text]");
            if (check.checked) {
                appData.servicesPersent[label.textContent] = Number(
                    input.value,
                );
            }
        });
        otherItemsNumber.forEach((item) => {
            const check = item.querySelector("input[type=checkbox]");
            const label = item.querySelector("label");
            const input = item.querySelector("input[type=text]");
            if (check.checked) {
                appData.servicesNumber[label.textContent] = Number(input.value);
            }
        });
        if (cmsSelect.value !== "other" && cmsSelect.value.length) {
            appData.servicesCMSPercent = Number(cmsSelect.value);
        } else if (cmsSelect.value === "other" && cmsOtherInput.value.length) {
            appData.servicesCMSPercent = Number(cmsOtherInput.value);
        }
    },
    addScreensBlock: function () {
        screens = document.querySelectorAll(".screen");
        const cloneScreen = screens[0].cloneNode(true);
        screens[screens.length - 1].after(cloneScreen);
        allSelectControlElements = document.querySelectorAll(
            ".main-controls select",
        );
        allEnterControlElemenst = document.querySelectorAll(
            ".main-controls__item screen input[type=text]",
        );
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
        console.log(appData);
        for (let screen of this.screens) {
            this.screenPrice += Number(screen.price);
        }
        for (let key in this.servicesNumber) {
            this.servicePricesNumber += Number(this.servicesNumber[key]);
        }
        for (let key in this.servicesPersent) {
            this.servicePricesPercent +=
                this.screenPrice * (this.servicesPersent[key] / 100);
        }
        if (this.servicesCMSPercent) {
            let fullPrice =
                this.screenPrice +
                this.servicePricesNumber +
                this.servicePricesPercent;
            console.log(fullPrice);
            this.fullPrice =
                fullPrice + fullPrice * (this.servicesCMSPercent / 100);
            console.log(
                fullPrice + fullPrice * (this.servicesCMSPercent / 100),
            );
        } else {
            this.fullPrice =
                this.screenPrice +
                this.servicePricesNumber +
                this.servicePricesPercent;
        }

        this.servicePercentPrice = Math.ceil(
            this.fullPrice - this.fullPrice * (this.rollback / 100),
        );
        if (this.screens.length > 1) {
            for (let i = 0; i <= this.screens.length - 1; i++) {
                this.screensCount += Number(this.screens[i].count);
            }
        } else {
            this.screensCount = this.screens[0].count;
        }
    },
    logger: function () {
        console.log(this.fullPrice);
        console.log(this.servicePercentPrice);
        for (let key in this) {
            console.log(this[key]);
        }
    },
};
appData.init();
