# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#

u1 = User.create(username: "jpstorrie", password: "josiah", email: "jpstorrie@gmail.com", recieve_emails: true)
u2 = User.create(username: "Ronin", password: "1800588", email: "ronin@gmail.com", recieve_emails: true)
u3 = User.create(username: "Userman", password: "ronin", email: "ronin@gmail.com", recieve_emails: true)

    # c1 = Child.create(name: "Gary", user_id: u2.id)
    # c2 = Child.create(name: "Stella", user_id: u2.id)
    # c3 = Child.create(name: "Jehoiakim", user_id: u1.id)
    # c4 = Child.create(name: "RutherFord", user_id: u1.id)

#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
