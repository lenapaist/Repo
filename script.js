let title = "Project",
    screens = "Простые, Сложные, Интерактивные",
    screenPrice = 1000,
    rollback = 10,
    fullPrice = 1000000,
    adaptive = true;

alert("Hello World");
console.log("Hi!");

console.log(typeof title, typeof fullPrice, typeof adaptive);
console.log(screens.length);
console.log(
    `Стоимость верстки экранов ${screenPrice} рублей/долларов/гривен/юани \nСтоимость разработки сайта ${fullPrice} рублей/долларов/гривен/юани`,
);
console.log(screens.toLowerCase().split());
console.log(fullPrice * (rollback / 100));
