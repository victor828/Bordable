exports.up = (pgm) => {
  pgm.createTable("users", {
    id: { type: "serial", primaryKey: true },
    username: { type: "varchar(50)", unique: true, notNull: true },
    name: { type: "varchar(255)" },
    email: { type: "varchar(255)" },
    password: { type: "varchar(255)", notNull: true },
    type: {
      type: "varchar(10)",
      default: "'admin'::varchar",
      check: "type IN ('user', 'admin')",
    },
  });

  pgm.createTable("Boards", {
    id: { type: "serial", primaryKey: true },
    title: { type: "varchar(255)", unique: true, notNull: true },
    color: { type: "varchar(50)" },
    userid: { type: "int" },
    createdate: { type: "date", default: "CURRENT_DATE" },
    updatedate: { type: "date", default: "CURRENT_DATE" },
    userid_fk: {
      type: "integer",
      references: '"users"',
      notNull: false,
      onDelete: "CASCADE",
    },
  });

  pgm.createTable("tables", {
    boardid: { type: "int" },
    titleTable: { type: "varchar(50)", unique: true, notNull: true },
    card: { type: "varchar(255)" },
    boardid_fk: {
      type: "integer",
      references: '"Boards"',
      notNull: false,
      onDelete: "CASCADE",
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable("tables");
  pgm.dropTable("Boards");
  pgm.dropTable("users");
};
