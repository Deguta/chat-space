ActiveRecord::Schema.define(version: 20200622124914) do

  create_table "users", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string   "name",       null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string   "email"
    t.index ["email"], name: "index_users_on_email", unique: true, using: :btree
    t.index ["name", "email"], name: "index_users_on_name_and_email", using: :btree
  end

end
