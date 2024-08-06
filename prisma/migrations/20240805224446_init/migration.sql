-- CreateTable
CREATE TABLE "books" (
    "book_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "title" VARCHAR(70) NOT NULL,
    "category" VARCHAR(40),
    "author" VARCHAR(40),
    "publisher" VARCHAR(50),
    "publication_year" INTEGER,
    "description" VARCHAR(300),
    "cover_image" VARCHAR(50),
    "available_now" VARCHAR(3),
    "registration_date" TIMESTAMP(6),

    CONSTRAINT "books_pkey" PRIMARY KEY ("book_id")
);

-- CreateTable
CREATE TABLE "ratings" (
    "rating_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "request_id" INTEGER NOT NULL,
    "creation_date" DATE,
    "comment" TEXT,
    "stars" VARCHAR(11),

    CONSTRAINT "ratings_pkey" PRIMARY KEY ("rating_id")
);

-- CreateTable
CREATE TABLE "request_history" (
    "status_id" SERIAL NOT NULL,
    "request_id" INTEGER NOT NULL,
    "previous_status" VARCHAR(40),
    "current_status" VARCHAR(40),
    "change_date" TIMESTAMP(6),

    CONSTRAINT "request_history_pkey" PRIMARY KEY ("status_id")
);

-- CreateTable
CREATE TABLE "requests" (
    "request_id" SERIAL NOT NULL,
    "books_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "request_number" VARCHAR(40),
    "delivery_zip" VARCHAR(10),
    "delivery_address" VARCHAR(50),
    "delivery_number" INTEGER,
    "delivery_neighborhood" VARCHAR(30),
    "delivery_city" VARCHAR(30),
    "delivery_state" VARCHAR(2),
    "request_date" TIMESTAMP(6),
    "offered_book_id" INTEGER,
    "requested_book_id" INTEGER,

    CONSTRAINT "requests_pkey" PRIMARY KEY ("request_id")
);

-- CreateTable
CREATE TABLE "users" (
    "user_id" SERIAL NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "password" VARCHAR(128) NOT NULL,
    "name" VARCHAR(40) NOT NULL,
    "zip_code" VARCHAR(10),
    "address" VARCHAR(50),
    "number" INTEGER,
    "neighborhood" VARCHAR(30),
    "city" VARCHAR(30),
    "state" VARCHAR(2),
    "birth_date" TIMESTAMP(6),
    "registration_date" TIMESTAMP(6),
    "positive_ratings" INTEGER DEFAULT 0,
    "negative_ratings" INTEGER DEFAULT 0,
    "blocked" BOOLEAN DEFAULT false,
    "admin" BOOLEAN DEFAULT false,

    CONSTRAINT "users_pkey" PRIMARY KEY ("user_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "books" ADD CONSTRAINT "books_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ratings" ADD CONSTRAINT "ratings_request_id_fkey" FOREIGN KEY ("request_id") REFERENCES "requests"("request_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ratings" ADD CONSTRAINT "ratings_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "request_history" ADD CONSTRAINT "request_history_request_id_fkey" FOREIGN KEY ("request_id") REFERENCES "requests"("request_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "requests" ADD CONSTRAINT "requests_books_id_fkey" FOREIGN KEY ("books_id") REFERENCES "books"("book_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "requests" ADD CONSTRAINT "requests_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;
