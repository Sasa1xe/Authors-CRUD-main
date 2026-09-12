import fs from "fs/promises";
import path from "path";

const dbPath = path.join(import.meta.dirname, "data.json");

export function createDB() {
  return {
    async getById(resource, id) {
      const data = await fs.readFile(dbPath, { encoding: "utf-8" });
      const json = JSON.parse(data);
      return json[resource].find((x) => String(x.id) === String(id));
    },

    async getAll(resource) {
      const data = await fs.readFile(dbPath, { encoding: "utf-8" });
      const json = JSON.parse(data);
      return json[resource];
    },

    async create(resource, obj) {
      // 1. Read raw DB file from disk
      const data = await fs.readFile(dbPath, { encoding: "utf-8" });
      // 2. Turn JSON string into JS object
      const json = JSON.parse(data);
      // 3. Clone payload and attach unique ID
      const newObj = { ...obj, id: getId() };
      // 4. Push new object into target resource array
      const newResource = [...json[resource], newObj];
      // 5. Update full DB object with new resource array
      const newData = {
        ...json,
        [resource]: newResource,
      };
      // 6. Save updated DB object back to file
      await fs.writeFile(dbPath, JSON.stringify(newData));
      // 7. Return new object with generated ID
      return newObj;
    },

    async update(resource, id, updates) {
      const data = await fs.readFile(dbPath, { encoding: "utf-8" });
      const json = JSON.parse(data);
     //--------------Going through the User's Array and Updating it------------    
      const newResource = json[resource].map((x) => {
        if (x.id != id) {  //  if the ID matches : don't change
          return x;
        } else {
          return {
            ...x,
            ...updates,
            id: x.id,
          };
        }
      });
      //-----------------------------------------------------------------------
      const newData = {
        ...json,
        [resource]: newResource,
      };
      await fs.writeFile(dbPath, JSON.stringify(newData));
    },

    async delete(resource, id) {
      const data = await fs.readFile(dbPath, { encoding: "utf-8" });
      const json = JSON.parse(data);
      const newResource = json[resource].filter((x) => x.id != id);

      const newData = {
        ...json,
        [resource]: newResource,
      };

      await fs.writeFile(dbPath, JSON.stringify(newData));
    },
  };
}

function getId() {
  return String(Math.floor(Math.random() * 10000000));
}