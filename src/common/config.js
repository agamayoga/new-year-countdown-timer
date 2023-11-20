let today = new Date();
let oldyear = today.getFullYear();
if (today.getMonth() == 0 && today.getDate() == 1) {
  oldyear -= 1; //Some tolerance, on 1st Jan display the previous year
};
let newyear = oldyear + 1;

let config = {
  fireworks: {
    enabled: true, //Fireworks enabled; note that the fireworks effect is CPU intensive!
    duration: 60 * 1000, //Fireworks stop after 1 minute
  },
  sound: {
    enabled: false, //Sound effect enabled
  },
  worldClock: {
    enabled: true //Footer with time zone clocks
  },

  //Interactive buttons on countdown screen
  isSettingsButtonVisible: true,

  //Country name changes every 5 seconds
  rotateTitleInterval: 5 * 1000,

  //For testing purposes
  testTimerInterval: 15 * 1000, //15 seconds countdown timer for test
  testNextInterval: 12 * 1000, //Wait 12 seconds then display next country

  //Higlight letters on new year, may have performance impact, turn off on slow CPU
  isHighlightTextEnabled: true,

  //Header text visibility
  isHeaderTitleVisible: true,

  //Text when the target moment is reached
  happyNewYearText: "Happy New Year!!!",

  //Is country flag visible (works on Firefox)
  isCountryFlagVisible: true,

  //Is program enabled
  isProgramMode: false,

  //Scheduled program for time zones and countries
  program: [
    {
      name: "Sydney 🇦🇺",
      start: new Date("December 31 " + oldyear + " 19:30:00"),
      midnight: new Date("December 31 " + oldyear + " 20:00:00")
    },
    {
      name: "Brisbane 🇦🇺",
      start: new Date("December 31 " + oldyear + " 20:30:00"),
      midnight: new Date("December 31 " + oldyear + " 21:00:00")
    },
    {
      name: "Japan 🇯🇵",
      start: new Date("December 31 " + oldyear + " 21:30:00"),
      midnight: new Date("December 31 " + oldyear + " 22:00:00")
    },
    {
      name: "China 🇨🇳",
      start: new Date("December 31 " + oldyear + " 22:30:00"),
      midnight: new Date("December 31 " + oldyear + " 23:00:00")
    },
    {
      name: "Thailand 🇹🇭",
      start: new Date("December 31 " + oldyear + " 23:30:00"),
      midnight: new Date("January 1 " + newyear + " 00:00:00")
    },
    {
      name: "Bhutan 🇧🇹",
      start: new Date("January 1 " + newyear + " 00:45:00"),
      midnight: new Date("January 1 " + newyear + " 01:00:00")
    },
    {
      name: "Nepal 🇳🇵",
      start: new Date("January 1 " + newyear + " 01:05:00"),
      midnight: new Date("January 1 " + newyear + " 01:15:00")
    },
    {
      name: "India 🇮🇳",
      start: new Date("January 1 " + newyear + " 01:20:00"),
      midnight: new Date("January 1 " + newyear + " 01:30:00")
    },
    {
      name: "Pakistan 🇵🇰",
      start: new Date("January 1 " + newyear + " 01:50:00"),
      midnight: new Date("January 1 " + newyear + " 02:00:00")
    },
    {
      name: "Afghanistan 🇦🇫",
      start: new Date("January 1 " + newyear + " 02:20:00"),
      midnight: new Date("January 1 " + newyear + " 02:30:00")
    },
    {
      name: "Azerbaijan 🇦🇿",
      start: new Date("January 1 " + newyear + " 02:50:00"),
      midnight: new Date("January 1 " + newyear + " 03:00:00")
    },
    {
      name: "Moscow 🇷🇺",
      //names: [ "Moscow 🇷🇺", "Yemen 🇾🇪" ],
      start: new Date("January 1 " + newyear + " 03:30:00"),
      midnight: new Date("January 1 " + newyear + " 04:00:00")
    },
    {
      name: "Romania 🇷🇴",
      names: [
        "Israel 🇮🇱",
        "Bulgaria 🇧🇬",
        "Greece 🇬🇷",
        "Estonia 🇪🇪",
        "South Africa 🇿🇦",
        "Romania 🇷🇴"
      ],
      start: new Date("January 1 " + newyear + " 04:30:00"),
      midnight: new Date("January 1 " + newyear + " 05:00:00")
    },
    {
      name: "Europe 🇪🇺",
      names: [
        "Austria 🇦🇹",
        "Belgium 🇧🇪",
        "Bosnia & Herzegovina 🇧🇦",
        "Croatia 🇭🇷",
        "Czechia 🇨🇿",
        "Denmark 🇩🇰",
        "France 🇫🇷",
        "Germany 🇩🇪",
        "Hungary 🇭🇺",
        "Italy 🇮🇹",
        "Netherlands 🇳🇱",
        "Norway 🇳🇴",
        "Poland 🇵🇱",
        "Serbia 🇷🇸",
        "Slovakia 🇸🇰",
        "Slovenia 🇸🇮",
        "Spain 🇪🇸",
        "Sweden 🇸🇪",
        "Switzerland 🇨🇭",
        "Europe 🇪🇺",
      ],
      start: new Date("January 1 " + newyear + " 05:30:00"),
      midnight: new Date("January 1 " + newyear + " 06:00:00")
    },
    {
      name: "London 🇬🇧",
      names: [ "London 🇬🇧", "Lisbon 🇵🇹", "Dublin 🇮🇪" ],
      start: new Date("January 1 " + newyear + " 06:30:00"),
      midnight: new Date("January 1 " + newyear + " 07:00:00")
    },
    {
      name: "Cabo Verde 🇨🇻", //Cape Verde
      start: new Date("January 1 " + newyear + " 07:30:00"),
      midnight: new Date("January 1 " + newyear + " 08:00:00")
    },
    {
      name: "Brasilia 🇧🇷",
      start: new Date("January 1 " + newyear + " 08:30:00"),
      midnight: new Date("January 1 " + newyear + " 10:00:00")
    },
    {
      name: "New York 🇺🇸",
      start: new Date("January 1 " + newyear + " 11:30:00"),
      midnight: new Date("January 1 " + newyear + " 12:00:00")
    },
    {
      name: "Mexico City 🇲🇽",
      start: new Date("January 1 " + newyear + " 12:30:00"),
      midnight: new Date("January 1 " + newyear + " 13:00:00")
    },
    {
      name: "Calgary 🇨🇦",
      start: new Date("January 1 " + newyear + " 13:30:00"),
      midnight: new Date("January 1 " + newyear + " 14:00:00")
    },
    {
      name: "Los Angeles 🇺🇸",
      start: new Date("January 1 " + newyear + " 14:30:00"),
      midnight: new Date("January 1 " + newyear + " 15:00:00")
    },
    {
      name: "Honolulu 🇺🇸",
      start: new Date("January 1 " + newyear + " 16:30:00"),
      midnight: new Date("January 1 " + newyear + " 17:00:00")
    },
  ],

  //World clocks - must be exactly 6 of them to fit the HTML elements
  clocks: [
    { name: "Honolulu", timezone: "Pacific/Honolulu" },
    { name: "Brasilia", timezone: "America/Sao_Paulo" },
    { name: "London", timezone: "Europe/London" },
    { name: "Koh Phangan", timezone: "Asia/Bangkok", highlight: true },
    { name: "Tokyo", timezone: "Asia/Tokyo" },
    { name: "Kiribati", timezone: "Pacific/Kiritimati" }, //Kiribati has 3 time zones, one symbolic is picked
  ]
};

export const $config = config;
