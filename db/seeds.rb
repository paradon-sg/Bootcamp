# frozen_string_literal: true

categories = Array.new(10) do
  Category.create!(
    name: Faker::Book.unique.genre,
    description: Faker::Lorem.sentence
  )
end

publishers = []
authors = []

100.times do |i|
  publishers << Publisher.create!(
    name: Faker::Book.unique.publisher,
    address: Faker::Address.full_address,
    phone: "081123#{i.to_s.rjust(4, '0')}",
    email: Faker::Internet.unique.email
  )

  authors << Author.create!(
    name: Faker::Book.unique.author,
    email: Faker::Internet.unique.email,
    phone: "082123#{i.to_s.rjust(4, '0')}"
  )
end

books = Array.new(100) do
  Book.create!(
    title: Faker::Book.unique.title,
    price: Faker::Commerce.price(range: 100..1000.0),
    publisher: publishers.sample,
    category: categories.sample
  )
end

books.zip(authors).each do |book, author|
  BookAuthor.create!(
    book: book,
    author: author
  )
end
