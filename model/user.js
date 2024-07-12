import { EntitySchema } from "typeorm";

const User = new EntitySchema({
  name: "User",
  tableName: "user", // optional
  columns: {
    id: {
      type: Number, //int(11)
      primary: true,
      generated: true,
    },
    mobile: {
      type: "bigint",
      default: null,
    },
    name: {
      type: String,
      default: null,
    },
    state: {
      type: String,
      default: null,
    },
    membership_id: {
      type: String,
      default: null,
    },
    chat_status: {
      type: String,
      default: "template-hello",
    },
  },
});

export default User;
// name: "Category", // Will use table name `category` as default behaviour.
//     tableName: "categories", // Optional: Provide `tableName` property to override the default behaviour for table name.
//     columns: {
//         id: {
//             primary: true,
//             type: "int",
//             generated: true,
//         },
//         name: {
//             type: "varchar",
//         },
//     },
// })
