/*# Задача 1

Создать класс `DB` который будет имплементировать `CRUD` модель.

-   В качестве структуры данных использовать `Map`.
-   Метод `create`:
-   -   принимает объект и валидирует его, в случае невалидности объекта – генерирует ошибку.
-   -   возвращает `id`
-   -   при создании пользователя генерирует уникальный `id`, который является ключом для объекта пользователя в структуре `Map`
-   Метод `read`:
-   -   принимает идентификатор пользователь
-   -   если такого пользователя нет возвращать `null`
-   -   если есть — возвращать объект пользователя с полем `id` внутри объекта.
-   -   если в метод `read` передать не строку, или не передать параметр вообще — генерировать ошибку.
-   Метод `readAll`:
-   -   возвращает массив пользователей
-   -   генерировать ошибку если в метод `readAll` передан параметр
-   Метод `update`:
-   -   обновляет пользователя
-   -   принимает 2 обязательных параметра
-   -   генерирует ошибку если передан несуществующий `id`
-   -   генерирует ошибку если передан `id` с типом не строка
-   -   генерирует ошибку если второй параметр не валидный
-   Метод `delete`:
-   -   удаляет пользователя
-   -   Генерировать ошибку если передан в метод `delete` несуществующий или невалидный `id`

```javascript*/
class DB {
    constructor() {
        this._personMap = new Map();
        this._idSet = new Set();
    };

    create(person) {
        if (this.isVrongPerson(person)) {
            throw new Error("Invalid person in create function");
        }

        const id = this.uniqueId();
        this._personMap.set(id, person);
        return id;
    };

    read(id) {
        if (!id || typeof id !== "string") {
            throw new Error("Invalid ID in read function")
        }

        const person = this._personMap.get(id);
        if(!person) {
            return null;
        }
        person.id = id;

        return person;
    };

    readAll() {
        if (arguments.length > 0) {
            throw new Error("readAll unction have parameters")
        }

        return this._personMap.values();
    };

    update(id, newPerson) {
        if (!id || typeof id !== "string") {
            throw new Error("Invalid ID parameter")
        }

        if (this.isVrongPerson(newPerson)) {
            throw new Error("Invalid person in update function");
        }

        const person = this._personMap.get(id);
        if(!person) {
            throw new Error("ID don't found");
        }

        this._personMap.set(id, newPerson);
    };

    delete(id) {
        if (!id || typeof id !== "string") {
            throw new Error("Invalid ID parameter")
        }

        if (!this._personMap.has(id)) {
            throw new Error("ID don't found");
        }

        this._personMap.delete(id);
        this._idSet.delete(id);
    };

    uniqueId() {
        let id = this.generateID();
        while (this._idSet.has(id)) {
            id = this.generateID()
        }
        return id;
    };

    generateID() {
        return '_' + Math.random().toString(36).substr(2, 9);
    };

    isVrongPerson(person) {
        return !person ||
            !person.name ||
            !person.age ||
            !person.country ||
            !person.salary ||
            typeof person.name !== "string" ||
            typeof person.age !== "number" ||
            typeof person.country !== "string" ||
            typeof person.salary !== "number";
    };
}

const db = new DB();

const person = {
    name: 'Pitter', // обязательное поле с типом string
    age: 21, // обязательное поле с типом number
    country: 'ua', // обязательное поле с типом string
    salary: 500 // обязательное поле с типом number
};

const id = db.create(person);
//console.log("delete = ", db.readAll());
const customer = db.read(id);
//console.log("customer = ",customer);
const customers = db.readAll(); // массив пользователей
//console.log("customers = ", customers);
db.update(id, { age: 22 }); // id
//console.log("update = ", db.read(id));
db.delete(id); // true
//console.log("delete = ", db.readAll());
