/// <reference path="../pb_data/types.d.ts" />
migrate(
  (app) => {
    const collection = new Collection({
      type: "base",
      name: "animals",
      listRule: "",
      viewRule: "",
      createRule: null,
      updateRule: null,
      deleteRule: null,
      fields: [
        { type: "text", name: "name", required: true },
        { type: "text", name: "scientificName", required: true },
        { type: "text", name: "description", required: true },
        { type: "text", name: "habitat", required: true },
        { type: "text", name: "diet", required: true },
        { type: "url", name: "image", required: true },
        { type: "url", name: "wikiUrl", required: true },
        {
          type: "select",
          name: "category",
          required: true,
          maxSelect: 1,
          values: [
            "Mamífero",
            "Ave",
            "Reptil",
            "Anfibio",
            "Pez",
            "Invertebrado",
          ],
        },
      ],
    })

    app.save(collection)
  },
  (app) => {
    const collection = app.findCollectionByNameOrId("animals")
    app.delete(collection)
  },
)
