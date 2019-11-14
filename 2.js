/*# Задача 2

Улучшить класс `DB` из предыдущей задачи.

-   Добавить метод `find`, который будет возвращать массив пользователей которые удовлетворяют условие переданное в качестве параметра
-   Генерировать ошибку, если query не валидный
-   Поля `name` и `country` ищут 100% совпадение
-   Поля `age` и `salary` принимают объект в котором должны быть или 2 параметра `min` и `max` или хотя-бы один из них
-   Возвращать пустой массив если не удалось найти пользователей которые удовлетворяют объект запроса

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

    find(query) {
        if (!query || typeof query !== "object") {
            throw new Error("Invalid query")
        }

        const res = [];
        for (const [key, value] of this._personMap) {
            if (
                (!query.name || !query.name.localeCompare(item.name)) &&
                (!query.country || !query.country.localeCompare(value.country)) &&
                (!query.age || !query.age.min || query.age.min <= value.age) &&
                (!query.age || !query.age.max || query.age.max >= value.age) &&
                (!query.salary || !query.salary.min || query.salary.min <= value.salary) &&
                (!query.salary | !query.salary.max || query.salary.max >= value.salary)
            ) {
                res.push(value);
            }
        }

        return res;
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

const query = {
    country: 'ua',
    age: {
        min: 21
    },
    salary: {
        min: 300,
        max: 600
    }
};

const person1 = {
    name: 'Pitter',
    age: 21,
    country: 'ua',
    salary: 500
};

const person2 = {
    name: 'Ivan',
    age: 18,
    country: 'ua',
    salary: 1500
};

const db = new DB();
db.create(person1);
db.create(person2);

//console.log(db.readAll());
const customers = db.find(query); // массив пользователей
console.log(customers);
