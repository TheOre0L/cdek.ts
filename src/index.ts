import chalk from "chalk";
import { Cdek } from "./cdek-service";
import {
  RegisterOrderDto,
  UpdateOrderDto,
} from "./cdek-service/order/dto/order.dto";

const cdek = new Cdek(
  "wqGwiQx0gg8mLtiEKsUinjVSICCjtTEP",
  "RmAmgvSgSl1yirlz9QupbzOJVqhCxcP5",
  "https://api.edu.cdek.ru/v2"
);

// Функция для цветного логирования
function logSuccess(message: string) {
  console.log(chalk.green.bold(`✔ ${message}`));
}

function logError(message: string) {
  console.log(chalk.red.bold(`✖ ${message}`));
}

function logInfo(message: string) {
  console.log(chalk.blue.bold(`ℹ ${message}`));
}

async function testTariff() {
  logInfo("Запрашиваем тариф...");
  try {
    const tariff = await cdek.getTariff({
      type: 1,
      from_location: { code: 164 },
      to_location: { code: 44 },
      packages: [{ weight: 1000, length: 10, width: 10, height: 10 }],
    });
    logSuccess("Тариф получен!");
  } catch (error: any) {
    logError("Ошибка при получении тарифа: " + error.message);
  }
}

async function testDeliveryPoints() {
  logInfo("Запрашиваем список ПВЗ...");
  try {
    const deliveryPoints = await cdek.getDeliveryPoints({
      country_code: "RU",
      size: 5,
    });
    logSuccess("Список ПВЗ получен!");
  } catch (error: any) {
    logError("Ошибка при получении ПВЗ: " + error.message);
  }
}

const orderData: RegisterOrderDto = {
  type: 1,
  number: "TEST-ORDER-001",
  tariff_code: 482,
  sender: {
    company: 'ООО "Тест"',
    name: "Иван Иванов",
    phones: [{ number: "+79991234567" }],
  },
  recipient: {
    name: "Петр Петров",
    phones: [{ number: "+79997654321" }],
  },
  from_location: { code: 44 },
  to_location: {
    code: 137,
    address: "Москва, ул. Ленина, д. 1",
  },
  packages: [
    {
      number: "PKG-001",
      weight: 1000,
      length: 20,
      width: 15,
      height: 10,
      items: [
        {
          name: "Ноутбук",
          ware_key: "ZZZVVVeee",
          quantity: 1,
          price: 50000,
          weight: 1000,
          amount: 1,
          cost: 50000,
          payment: {
            value: 0,
          },
        },
      ],
    },
  ],
};

async function testCreateOrder() {
  logInfo("Регистрируем заказ...");
  try {
    const registeredOrder = await cdek.orderRegister(orderData);
    logSuccess("Заказ успешно зарегистрирован!");
    logInfo("Ответ от API - ");
    console.table(registeredOrder);
    logInfo("Информация по заказу - ");
    console.table(registeredOrder.requests);
  } catch (error: any) {
    logError("Ошибка при регистрации заказа!");
    console.error(error.response?.data?.requests?.[0]?.errors || []);
  }
}
const orderUpdData: UpdateOrderDto = {
  uuid: "14ac0613-9f10-4bae-9444-5ea19299c245",
  type: 1,
  number: "TEST-ORDER-001",
  tariff_code: 482,
  sender: {
    company: 'ООО "Тест"',
    name: "Иван Иванов",
    phones: [{ number: "+79991234567" }],
  },
  recipient: {
    name: "Петр Петров",
    phones: [{ number: "+79997654321" }],
  },
  from_location: { code: 44 },
  to_location: {
    code: 137,
    address: "Москва, ул. Ленина, д. 1",
  },
  packages: [
    {
      number: "PKG-001",
      weight: 1000,
      length: 20,
      width: 15,
      height: 10,
      items: [
        {
          name: "Шильдик",
          ware_key: "ZZZVVVeee",
          quantity: 1,
          price: 10000,
          weight: 1000,
          amount: 1,
          cost: 10000,
          payment: {
            value: 0,
          },
        },
      ],
    },
  ],
};
async function testUpdateOrder() {
  logInfo("Изменяем заказ...");
  try {
    const registeredOrder = await cdek.orderUpdate(orderUpdData);
    logSuccess("Заказ успешно изменен!");
    logInfo("Ответ от API - ");
    console.table(registeredOrder);
    logInfo("Информация по заказу - ");
    console.table(registeredOrder.requests);
  } catch (error: any) {
    logError("Ошибка при изменении заказа!");
    console.error(error);
  }
}

async function testGetByUUID() {
  logInfo("Ищем заказ...");
  try {
    const registeredOrder = await cdek.getOrderByUUID(
      "095be615-a8ad-4c33-8e9c-c7612fbf6c9f"
    );
    logSuccess("Заказ найден!");
    logInfo("Ответ от API - ");
    console.table(registeredOrder);
    logInfo("Информация по заказу - ");
    console.table(registeredOrder.requests);
  } catch (error: any) {
    logError("Ошибка при получении заказа!");
    console.error(error);
  }
}

async function testGetLocationByCity() {
  logInfo("Ищем локации...");
  try {
    const registeredOrder = await cdek.getLocationsByCity({
      name: "Магадан",
      country_code: "RU",
    });
    logSuccess("Локация найдена!");
    logInfo("Ответ от API - ");
    console.table(registeredOrder);
  } catch (error: any) {
    logError("Ошибка при получении локации!");
    if (
      error.message ===
      "Заказ с таким uuid (095be615-a8ad-4c33-8e9c-c7612fbf6c9f) не найден!"
    )
      console.error(error);
  }
}

async function testgetCitysList() {
  logInfo("Ищем города...");
  try {
    const registeredOrder = await cdek.getCitysList({
      country_codes: ["RU"], 
      region_code: 26, 
      size: 10, 
      page: 1, 
      lang: "RU",
    });
    logSuccess("Города найдены!!");
    logInfo("Ответ от API - ");
    console.table(registeredOrder);
  } catch (error: any) {
    logError("Ошибка при получении городов!");
    console.error(error);
  }
}

//Решить проблему с регионами
/*async function testgetRegionList() {
  logInfo("Ищем регионы...");
  try {
    const registeredOrder = await cdek.getRegionList({
      country_codes: ["RU"], 
      size: 10, 
      page: 1, 
      lang: "RU",
    });
    logSuccess("Регионы найдены!!");
    logInfo("Ответ от API - ");
    console.table(registeredOrder);
  } catch (error: any) {
    logError("Ошибка при получении регионов!");
    console.error(error);
  }
}*/

//По order_uuid ничего не выдаст, пока не будет базы, поэтому пока закоментил
/*async function testGetCheckInfo() {
  logInfo("Ищем информацию о чеке...");
  try {
    const registeredOrder = await cdek.getCheckInfo({
      order_uuid: "72753031-e66b-4146-ab8c-52179ef4020a",
    });
    logSuccess("Информация о чеке найдена!!");
    logInfo("Ответ от API - ");
    console.table(registeredOrder);
  } catch (error: any) {
    logError("Ошибка при получении информации о чеке!");
    console.error(error);
  }
}*/

// 🚀 Запуск всех тестов
async function runTests() {
  console.log(chalk.yellow.bold("\n🚀 Запуск тестов CDEK-SERVICE...\n"));
  await testTariff();
  await testDeliveryPoints();
  await testCreateOrder();
  await testGetLocationByCity();
  await testgetCitysList();
  //await testgetRegionList();
  //await testGetCheckInfo();
  await testUpdateOrder();
  await testGetByUUID();
}

runTests();
