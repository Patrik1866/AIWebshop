--
-- PostgreSQL database dump
--

-- Dumped from database version 14.15 (Ubuntu 14.15-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.15 (Ubuntu 14.15-0ubuntu0.22.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: aiwebshop; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA aiwebshop;


ALTER SCHEMA aiwebshop OWNER TO postgres;

--
-- Name: check_product_category_function(); Type: FUNCTION; Schema: aiwebshop; Owner: postgres
--

CREATE FUNCTION aiwebshop.check_product_category_function() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 
        FROM categories c
        JOIN sub_category sc ON sc.category_id = c.category_id
        WHERE c.category_id = NEW.category_id AND sc.sub_category_id = NEW.sub_category_id
    ) THEN
        RAISE EXCEPTION 'Sub-category does not exist in the specified category';
    END IF;

    RETURN NEW;
END;
$$;


ALTER FUNCTION aiwebshop.check_product_category_function() OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: addresses; Type: TABLE; Schema: aiwebshop; Owner: postgres
--

CREATE TABLE aiwebshop.addresses (
    address_id integer NOT NULL,
    user_id integer,
    city character varying(255),
    street character varying(255),
    address character varying(255),
    zip_code character varying(255)
);


ALTER TABLE aiwebshop.addresses OWNER TO postgres;

--
-- Name: addresses_address_id_seq; Type: SEQUENCE; Schema: aiwebshop; Owner: postgres
--

CREATE SEQUENCE aiwebshop.addresses_address_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE aiwebshop.addresses_address_id_seq OWNER TO postgres;

--
-- Name: addresses_address_id_seq; Type: SEQUENCE OWNED BY; Schema: aiwebshop; Owner: postgres
--

ALTER SEQUENCE aiwebshop.addresses_address_id_seq OWNED BY aiwebshop.addresses.address_id;


--
-- Name: cart; Type: TABLE; Schema: aiwebshop; Owner: postgres
--

CREATE TABLE aiwebshop.cart (
    cart_id integer NOT NULL,
    user_id integer,
    product_id integer,
    quantity integer
);


ALTER TABLE aiwebshop.cart OWNER TO postgres;

--
-- Name: cart_cart_id_seq; Type: SEQUENCE; Schema: aiwebshop; Owner: postgres
--

CREATE SEQUENCE aiwebshop.cart_cart_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE aiwebshop.cart_cart_id_seq OWNER TO postgres;

--
-- Name: cart_cart_id_seq; Type: SEQUENCE OWNED BY; Schema: aiwebshop; Owner: postgres
--

ALTER SEQUENCE aiwebshop.cart_cart_id_seq OWNED BY aiwebshop.cart.cart_id;


--
-- Name: categories; Type: TABLE; Schema: aiwebshop; Owner: postgres
--

CREATE TABLE aiwebshop.categories (
    category_id integer NOT NULL,
    name character varying
);


ALTER TABLE aiwebshop.categories OWNER TO postgres;

--
-- Name: categories_category_id_seq; Type: SEQUENCE; Schema: aiwebshop; Owner: postgres
--

CREATE SEQUENCE aiwebshop.categories_category_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE aiwebshop.categories_category_id_seq OWNER TO postgres;

--
-- Name: categories_category_id_seq; Type: SEQUENCE OWNED BY; Schema: aiwebshop; Owner: postgres
--

ALTER SEQUENCE aiwebshop.categories_category_id_seq OWNED BY aiwebshop.categories.category_id;


--
-- Name: chat_messages; Type: TABLE; Schema: aiwebshop; Owner: postgres
--

CREATE TABLE aiwebshop.chat_messages (
    chat_id integer NOT NULL,
    user_id integer NOT NULL,
    message character varying(255),
    question character varying(255)
);


ALTER TABLE aiwebshop.chat_messages OWNER TO postgres;

--
-- Name: chat_messages_chat_id_seq; Type: SEQUENCE; Schema: aiwebshop; Owner: postgres
--

CREATE SEQUENCE aiwebshop.chat_messages_chat_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE aiwebshop.chat_messages_chat_id_seq OWNER TO postgres;

--
-- Name: chat_messages_chat_id_seq; Type: SEQUENCE OWNED BY; Schema: aiwebshop; Owner: postgres
--

ALTER SEQUENCE aiwebshop.chat_messages_chat_id_seq OWNED BY aiwebshop.chat_messages.chat_id;


--
-- Name: chat_messages_seq; Type: SEQUENCE; Schema: aiwebshop; Owner: postgres
--

CREATE SEQUENCE aiwebshop.chat_messages_seq
    START WITH 1
    INCREMENT BY 50
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE aiwebshop.chat_messages_seq OWNER TO postgres;

--
-- Name: chat_seq; Type: SEQUENCE; Schema: aiwebshop; Owner: postgres
--

CREATE SEQUENCE aiwebshop.chat_seq
    START WITH 1
    INCREMENT BY 50
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE aiwebshop.chat_seq OWNER TO postgres;

--
-- Name: order_items; Type: TABLE; Schema: aiwebshop; Owner: postgres
--

CREATE TABLE aiwebshop.order_items (
    item_id integer NOT NULL,
    order_id integer,
    product_id integer,
    quantity integer,
    price numeric
);


ALTER TABLE aiwebshop.order_items OWNER TO postgres;

--
-- Name: order_items_item_id_seq; Type: SEQUENCE; Schema: aiwebshop; Owner: postgres
--

CREATE SEQUENCE aiwebshop.order_items_item_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE aiwebshop.order_items_item_id_seq OWNER TO postgres;

--
-- Name: order_items_item_id_seq; Type: SEQUENCE OWNED BY; Schema: aiwebshop; Owner: postgres
--

ALTER SEQUENCE aiwebshop.order_items_item_id_seq OWNED BY aiwebshop.order_items.item_id;


--
-- Name: orders; Type: TABLE; Schema: aiwebshop; Owner: postgres
--

CREATE TABLE aiwebshop.orders (
    order_id integer NOT NULL,
    user_id integer,
    order_date date,
    state character varying,
    address_id integer,
    shipping_type_id integer,
    payment_type_id integer
);


ALTER TABLE aiwebshop.orders OWNER TO postgres;

--
-- Name: orders_order_id_seq; Type: SEQUENCE; Schema: aiwebshop; Owner: postgres
--

CREATE SEQUENCE aiwebshop.orders_order_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE aiwebshop.orders_order_id_seq OWNER TO postgres;

--
-- Name: orders_order_id_seq; Type: SEQUENCE OWNED BY; Schema: aiwebshop; Owner: postgres
--

ALTER SEQUENCE aiwebshop.orders_order_id_seq OWNED BY aiwebshop.orders.order_id;


--
-- Name: payment_type; Type: TABLE; Schema: aiwebshop; Owner: postgres
--

CREATE TABLE aiwebshop.payment_type (
    payment_type_id integer NOT NULL,
    name character varying,
    description character varying
);


ALTER TABLE aiwebshop.payment_type OWNER TO postgres;

--
-- Name: payment_type_payment_type_id_seq; Type: SEQUENCE; Schema: aiwebshop; Owner: postgres
--

CREATE SEQUENCE aiwebshop.payment_type_payment_type_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE aiwebshop.payment_type_payment_type_id_seq OWNER TO postgres;

--
-- Name: payment_type_payment_type_id_seq; Type: SEQUENCE OWNED BY; Schema: aiwebshop; Owner: postgres
--

ALTER SEQUENCE aiwebshop.payment_type_payment_type_id_seq OWNED BY aiwebshop.payment_type.payment_type_id;


--
-- Name: products; Type: TABLE; Schema: aiwebshop; Owner: postgres
--

CREATE TABLE aiwebshop.products (
    product_id integer NOT NULL,
    name character varying(255),
    description character varying(255),
    price integer,
    quantity integer,
    category_id integer,
    sub_category_id integer
);


ALTER TABLE aiwebshop.products OWNER TO postgres;

--
-- Name: products_product_id_seq; Type: SEQUENCE; Schema: aiwebshop; Owner: postgres
--

CREATE SEQUENCE aiwebshop.products_product_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE aiwebshop.products_product_id_seq OWNER TO postgres;

--
-- Name: products_product_id_seq; Type: SEQUENCE OWNED BY; Schema: aiwebshop; Owner: postgres
--

ALTER SEQUENCE aiwebshop.products_product_id_seq OWNED BY aiwebshop.products.product_id;


--
-- Name: sub_category; Type: TABLE; Schema: aiwebshop; Owner: postgres
--

CREATE TABLE aiwebshop.sub_category (
    sub_category_id integer NOT NULL,
    name character varying,
    category_id integer NOT NULL
);


ALTER TABLE aiwebshop.sub_category OWNER TO postgres;

--
-- Name: products_sub_category_product_sub_category_id_seq; Type: SEQUENCE; Schema: aiwebshop; Owner: postgres
--

CREATE SEQUENCE aiwebshop.products_sub_category_product_sub_category_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE aiwebshop.products_sub_category_product_sub_category_id_seq OWNER TO postgres;

--
-- Name: products_sub_category_product_sub_category_id_seq; Type: SEQUENCE OWNED BY; Schema: aiwebshop; Owner: postgres
--

ALTER SEQUENCE aiwebshop.products_sub_category_product_sub_category_id_seq OWNED BY aiwebshop.sub_category.sub_category_id;


--
-- Name: reviews; Type: TABLE; Schema: aiwebshop; Owner: postgres
--

CREATE TABLE aiwebshop.reviews (
    review_id integer NOT NULL,
    user_id integer,
    product_id integer,
    point integer,
    description character varying(255)
);


ALTER TABLE aiwebshop.reviews OWNER TO postgres;

--
-- Name: reviews_review_id_seq; Type: SEQUENCE; Schema: aiwebshop; Owner: postgres
--

CREATE SEQUENCE aiwebshop.reviews_review_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE aiwebshop.reviews_review_id_seq OWNER TO postgres;

--
-- Name: reviews_review_id_seq; Type: SEQUENCE OWNED BY; Schema: aiwebshop; Owner: postgres
--

ALTER SEQUENCE aiwebshop.reviews_review_id_seq OWNED BY aiwebshop.reviews.review_id;


--
-- Name: shipment_type; Type: TABLE; Schema: aiwebshop; Owner: postgres
--

CREATE TABLE aiwebshop.shipment_type (
    shipment_type_id integer NOT NULL,
    name character varying,
    description text,
    price numeric
);


ALTER TABLE aiwebshop.shipment_type OWNER TO postgres;

--
-- Name: shipment_type_shipment_type_id_seq; Type: SEQUENCE; Schema: aiwebshop; Owner: postgres
--

CREATE SEQUENCE aiwebshop.shipment_type_shipment_type_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE aiwebshop.shipment_type_shipment_type_id_seq OWNER TO postgres;

--
-- Name: shipment_type_shipment_type_id_seq; Type: SEQUENCE OWNED BY; Schema: aiwebshop; Owner: postgres
--

ALTER SEQUENCE aiwebshop.shipment_type_shipment_type_id_seq OWNED BY aiwebshop.shipment_type.shipment_type_id;


--
-- Name: users; Type: TABLE; Schema: aiwebshop; Owner: postgres
--

CREATE TABLE aiwebshop.users (
    user_id integer NOT NULL,
    surname character varying(255) NOT NULL,
    firstname character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    phone character varying(255) NOT NULL,
    username character varying(255) NOT NULL,
    isadmin boolean,
    ismoderator boolean
);


ALTER TABLE aiwebshop.users OWNER TO postgres;

--
-- Name: users_seq; Type: SEQUENCE; Schema: aiwebshop; Owner: postgres
--

CREATE SEQUENCE aiwebshop.users_seq
    START WITH 1
    INCREMENT BY 50
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE aiwebshop.users_seq OWNER TO postgres;

--
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: aiwebshop; Owner: postgres
--

CREATE SEQUENCE aiwebshop.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE aiwebshop.users_user_id_seq OWNER TO postgres;

--
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: aiwebshop; Owner: postgres
--

ALTER SEQUENCE aiwebshop.users_user_id_seq OWNED BY aiwebshop.users.user_id;


--
-- Name: addresses address_id; Type: DEFAULT; Schema: aiwebshop; Owner: postgres
--

ALTER TABLE ONLY aiwebshop.addresses ALTER COLUMN address_id SET DEFAULT nextval('aiwebshop.addresses_address_id_seq'::regclass);


--
-- Name: cart cart_id; Type: DEFAULT; Schema: aiwebshop; Owner: postgres
--

ALTER TABLE ONLY aiwebshop.cart ALTER COLUMN cart_id SET DEFAULT nextval('aiwebshop.cart_cart_id_seq'::regclass);


--
-- Name: categories category_id; Type: DEFAULT; Schema: aiwebshop; Owner: postgres
--

ALTER TABLE ONLY aiwebshop.categories ALTER COLUMN category_id SET DEFAULT nextval('aiwebshop.categories_category_id_seq'::regclass);


--
-- Name: chat_messages chat_id; Type: DEFAULT; Schema: aiwebshop; Owner: postgres
--

ALTER TABLE ONLY aiwebshop.chat_messages ALTER COLUMN chat_id SET DEFAULT nextval('aiwebshop.chat_messages_chat_id_seq'::regclass);


--
-- Name: order_items item_id; Type: DEFAULT; Schema: aiwebshop; Owner: postgres
--

ALTER TABLE ONLY aiwebshop.order_items ALTER COLUMN item_id SET DEFAULT nextval('aiwebshop.order_items_item_id_seq'::regclass);


--
-- Name: orders order_id; Type: DEFAULT; Schema: aiwebshop; Owner: postgres
--

ALTER TABLE ONLY aiwebshop.orders ALTER COLUMN order_id SET DEFAULT nextval('aiwebshop.orders_order_id_seq'::regclass);


--
-- Name: payment_type payment_type_id; Type: DEFAULT; Schema: aiwebshop; Owner: postgres
--

ALTER TABLE ONLY aiwebshop.payment_type ALTER COLUMN payment_type_id SET DEFAULT nextval('aiwebshop.payment_type_payment_type_id_seq'::regclass);


--
-- Name: products product_id; Type: DEFAULT; Schema: aiwebshop; Owner: postgres
--

ALTER TABLE ONLY aiwebshop.products ALTER COLUMN product_id SET DEFAULT nextval('aiwebshop.products_product_id_seq'::regclass);


--
-- Name: reviews review_id; Type: DEFAULT; Schema: aiwebshop; Owner: postgres
--

ALTER TABLE ONLY aiwebshop.reviews ALTER COLUMN review_id SET DEFAULT nextval('aiwebshop.reviews_review_id_seq'::regclass);


--
-- Name: shipment_type shipment_type_id; Type: DEFAULT; Schema: aiwebshop; Owner: postgres
--

ALTER TABLE ONLY aiwebshop.shipment_type ALTER COLUMN shipment_type_id SET DEFAULT nextval('aiwebshop.shipment_type_shipment_type_id_seq'::regclass);


--
-- Name: sub_category sub_category_id; Type: DEFAULT; Schema: aiwebshop; Owner: postgres
--

ALTER TABLE ONLY aiwebshop.sub_category ALTER COLUMN sub_category_id SET DEFAULT nextval('aiwebshop.products_sub_category_product_sub_category_id_seq'::regclass);


--
-- Name: users user_id; Type: DEFAULT; Schema: aiwebshop; Owner: postgres
--

ALTER TABLE ONLY aiwebshop.users ALTER COLUMN user_id SET DEFAULT nextval('aiwebshop.users_user_id_seq'::regclass);


--
-- Data for Name: addresses; Type: TABLE DATA; Schema: aiwebshop; Owner: postgres
--

COPY aiwebshop.addresses (address_id, user_id, city, street, address, zip_code) FROM stdin;
17	4	teszt	teszt	12	123
\.


--
-- Data for Name: cart; Type: TABLE DATA; Schema: aiwebshop; Owner: postgres
--

COPY aiwebshop.cart (cart_id, user_id, product_id, quantity) FROM stdin;
\.


--
-- Data for Name: categories; Type: TABLE DATA; Schema: aiwebshop; Owner: postgres
--

COPY aiwebshop.categories (category_id, name) FROM stdin;
1200	Elektronika
2200	Ruházat
3200	Szépség és Egészség
4200	Háztartás
5200	Sport és Szabadidő
6200	Étel és Ital
7200	Könyvek és Irodaszerek
\.


--
-- Data for Name: chat_messages; Type: TABLE DATA; Schema: aiwebshop; Owner: postgres
--

COPY aiwebshop.chat_messages (chat_id, user_id, message, question) FROM stdin;
1	4	Szia! Miben segíthetek?	\N
2	4	Szeretem a zenét.	\N
52	4	zenét	Szeretem az őszt
53	4	Köszönöm szépen, jól vagyok!	Hogy vagy?
\.


--
-- Data for Name: order_items; Type: TABLE DATA; Schema: aiwebshop; Owner: postgres
--

COPY aiwebshop.order_items (item_id, order_id, product_id, quantity, price) FROM stdin;
\.


--
-- Data for Name: orders; Type: TABLE DATA; Schema: aiwebshop; Owner: postgres
--

COPY aiwebshop.orders (order_id, user_id, order_date, state, address_id, shipping_type_id, payment_type_id) FROM stdin;
\.


--
-- Data for Name: payment_type; Type: TABLE DATA; Schema: aiwebshop; Owner: postgres
--

COPY aiwebshop.payment_type (payment_type_id, name, description) FROM stdin;
\.


--
-- Data for Name: products; Type: TABLE DATA; Schema: aiwebshop; Owner: postgres
--

COPY aiwebshop.products (product_id, name, description, price, quantity, category_id, sub_category_id) FROM stdin;
\.


--
-- Data for Name: reviews; Type: TABLE DATA; Schema: aiwebshop; Owner: postgres
--

COPY aiwebshop.reviews (review_id, user_id, product_id, point, description) FROM stdin;
\.


--
-- Data for Name: shipment_type; Type: TABLE DATA; Schema: aiwebshop; Owner: postgres
--

COPY aiwebshop.shipment_type (shipment_type_id, name, description, price) FROM stdin;
\.


--
-- Data for Name: sub_category; Type: TABLE DATA; Schema: aiwebshop; Owner: postgres
--

COPY aiwebshop.sub_category (sub_category_id, name, category_id) FROM stdin;
1220	Laptop	1200
1230	Tablet	1200
1240	Okosóra	1200
1250	Tartozék	1200
1210	Mobiltelefon	1200
2210	Ferfi ruházat	2200
2220	Női ruházat	2200
2230	Gyerek ruházat	2200
2240	Kisállat ruházat	2200
2250	Kiegészítők	2200
3210	Bőrápolás	3200
3220	Hajápolás	3200
3230	Smink	3200
3240	Vitaminok	3200
3250	Egyéb kiegészítők	3200
4210	Tisztítószerek	4200
4220	Konyhai eszközök	4200
4230	Lakberendezési tárgyak	4200
4240	Kerti eszközök	4200
4250	Dekoráció	4200
5210	Sportfelszerelés	5200
5220	Fitness eszközök	5200
5230	Outdoor felszerelések	5200
5240	Hobbi és Játékok	5200
6210	Élelmiszer	6200
6220	Ital	6200
6230	Különlegességek és ajándékcsomagok	6200
6240	Alkohol	6200
7210	Szépirodalom	7200
7220	Szakirodalom	7200
7230	Irodaszerek	7200
7240	Jegyzetfüzet és naptár	7200
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: aiwebshop; Owner: postgres
--

COPY aiwebshop.users (user_id, surname, firstname, email, password, phone, username, isadmin, ismoderator) FROM stdin;
2	teszt	teszt	teszt@teszt.hu	$2a$10$ND/9oA7VAcAIKNJRn/Vcge7ZyMVZxrz9064cyjK5UhWkkXSmgW08.	123456789	teszt	f	t
4	admin	admin	teszt@teszt.hu	$2a$10$rg0iEkayH5v5yvYj/Rm/oeWXo8.d5nOlUSJPIHPZ2RBQVrOPkRfeu	123456789	admin	t	f
52	user	user	teszt@teszt.hu	$2a$10$/Q.qARq1mh2fA4MQBSDSMeyjNris6.xJ4mNyRodw/yE1nVDmbDVvK	123456789	user	f	f
102	asd	asd	asd@asd.hu	$2a$10$AsapZ0nSwKTS2ll7In3co.l5Iz5QwJfAycaQvmM4fqkMDlVyRe1cC	asd	asd	f	f
\.


--
-- Name: addresses_address_id_seq; Type: SEQUENCE SET; Schema: aiwebshop; Owner: postgres
--

SELECT pg_catalog.setval('aiwebshop.addresses_address_id_seq', 17, true);


--
-- Name: cart_cart_id_seq; Type: SEQUENCE SET; Schema: aiwebshop; Owner: postgres
--

SELECT pg_catalog.setval('aiwebshop.cart_cart_id_seq', 1, false);


--
-- Name: categories_category_id_seq; Type: SEQUENCE SET; Schema: aiwebshop; Owner: postgres
--

SELECT pg_catalog.setval('aiwebshop.categories_category_id_seq', 10, true);


--
-- Name: chat_messages_chat_id_seq; Type: SEQUENCE SET; Schema: aiwebshop; Owner: postgres
--

SELECT pg_catalog.setval('aiwebshop.chat_messages_chat_id_seq', 1, false);


--
-- Name: chat_messages_seq; Type: SEQUENCE SET; Schema: aiwebshop; Owner: postgres
--

SELECT pg_catalog.setval('aiwebshop.chat_messages_seq', 201, true);


--
-- Name: chat_seq; Type: SEQUENCE SET; Schema: aiwebshop; Owner: postgres
--

SELECT pg_catalog.setval('aiwebshop.chat_seq', 1, false);


--
-- Name: order_items_item_id_seq; Type: SEQUENCE SET; Schema: aiwebshop; Owner: postgres
--

SELECT pg_catalog.setval('aiwebshop.order_items_item_id_seq', 1, false);


--
-- Name: orders_order_id_seq; Type: SEQUENCE SET; Schema: aiwebshop; Owner: postgres
--

SELECT pg_catalog.setval('aiwebshop.orders_order_id_seq', 1, false);


--
-- Name: payment_type_payment_type_id_seq; Type: SEQUENCE SET; Schema: aiwebshop; Owner: postgres
--

SELECT pg_catalog.setval('aiwebshop.payment_type_payment_type_id_seq', 1, false);


--
-- Name: products_product_id_seq; Type: SEQUENCE SET; Schema: aiwebshop; Owner: postgres
--

SELECT pg_catalog.setval('aiwebshop.products_product_id_seq', 31, true);


--
-- Name: products_sub_category_product_sub_category_id_seq; Type: SEQUENCE SET; Schema: aiwebshop; Owner: postgres
--

SELECT pg_catalog.setval('aiwebshop.products_sub_category_product_sub_category_id_seq', 38, true);


--
-- Name: reviews_review_id_seq; Type: SEQUENCE SET; Schema: aiwebshop; Owner: postgres
--

SELECT pg_catalog.setval('aiwebshop.reviews_review_id_seq', 1, false);


--
-- Name: shipment_type_shipment_type_id_seq; Type: SEQUENCE SET; Schema: aiwebshop; Owner: postgres
--

SELECT pg_catalog.setval('aiwebshop.shipment_type_shipment_type_id_seq', 1, false);


--
-- Name: users_seq; Type: SEQUENCE SET; Schema: aiwebshop; Owner: postgres
--

SELECT pg_catalog.setval('aiwebshop.users_seq', 151, true);


--
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: aiwebshop; Owner: postgres
--

SELECT pg_catalog.setval('aiwebshop.users_user_id_seq', 38, true);


--
-- Name: addresses addresses_pk; Type: CONSTRAINT; Schema: aiwebshop; Owner: postgres
--

ALTER TABLE ONLY aiwebshop.addresses
    ADD CONSTRAINT addresses_pk PRIMARY KEY (address_id);


--
-- Name: cart cart_pk; Type: CONSTRAINT; Schema: aiwebshop; Owner: postgres
--

ALTER TABLE ONLY aiwebshop.cart
    ADD CONSTRAINT cart_pk PRIMARY KEY (cart_id);


--
-- Name: categories categories_pk; Type: CONSTRAINT; Schema: aiwebshop; Owner: postgres
--

ALTER TABLE ONLY aiwebshop.categories
    ADD CONSTRAINT categories_pk PRIMARY KEY (category_id);


--
-- Name: chat_messages chat_messages_pk; Type: CONSTRAINT; Schema: aiwebshop; Owner: postgres
--

ALTER TABLE ONLY aiwebshop.chat_messages
    ADD CONSTRAINT chat_messages_pk PRIMARY KEY (chat_id);


--
-- Name: order_items order_items_pk; Type: CONSTRAINT; Schema: aiwebshop; Owner: postgres
--

ALTER TABLE ONLY aiwebshop.order_items
    ADD CONSTRAINT order_items_pk PRIMARY KEY (item_id);


--
-- Name: orders orders_pk; Type: CONSTRAINT; Schema: aiwebshop; Owner: postgres
--

ALTER TABLE ONLY aiwebshop.orders
    ADD CONSTRAINT orders_pk PRIMARY KEY (order_id);


--
-- Name: payment_type payment_type_pk; Type: CONSTRAINT; Schema: aiwebshop; Owner: postgres
--

ALTER TABLE ONLY aiwebshop.payment_type
    ADD CONSTRAINT payment_type_pk PRIMARY KEY (payment_type_id);


--
-- Name: products products_pk; Type: CONSTRAINT; Schema: aiwebshop; Owner: postgres
--

ALTER TABLE ONLY aiwebshop.products
    ADD CONSTRAINT products_pk PRIMARY KEY (product_id);


--
-- Name: sub_category products_sub_category_pk; Type: CONSTRAINT; Schema: aiwebshop; Owner: postgres
--

ALTER TABLE ONLY aiwebshop.sub_category
    ADD CONSTRAINT products_sub_category_pk PRIMARY KEY (sub_category_id);


--
-- Name: reviews reviews_pk; Type: CONSTRAINT; Schema: aiwebshop; Owner: postgres
--

ALTER TABLE ONLY aiwebshop.reviews
    ADD CONSTRAINT reviews_pk PRIMARY KEY (review_id);


--
-- Name: shipment_type shipment_type_pk; Type: CONSTRAINT; Schema: aiwebshop; Owner: postgres
--

ALTER TABLE ONLY aiwebshop.shipment_type
    ADD CONSTRAINT shipment_type_pk PRIMARY KEY (shipment_type_id);


--
-- Name: users uniqe_username; Type: CONSTRAINT; Schema: aiwebshop; Owner: postgres
--

ALTER TABLE ONLY aiwebshop.users
    ADD CONSTRAINT uniqe_username UNIQUE (username);


--
-- Name: users users_pk; Type: CONSTRAINT; Schema: aiwebshop; Owner: postgres
--

ALTER TABLE ONLY aiwebshop.users
    ADD CONSTRAINT users_pk PRIMARY KEY (user_id);


--
-- Name: products check_product_category; Type: TRIGGER; Schema: aiwebshop; Owner: postgres
--

CREATE TRIGGER check_product_category BEFORE INSERT OR UPDATE ON aiwebshop.products FOR EACH ROW EXECUTE FUNCTION aiwebshop.check_product_category_function();


--
-- Name: addresses addresses_users_fk; Type: FK CONSTRAINT; Schema: aiwebshop; Owner: postgres
--

ALTER TABLE ONLY aiwebshop.addresses
    ADD CONSTRAINT addresses_users_fk FOREIGN KEY (user_id) REFERENCES aiwebshop.users(user_id);


--
-- Name: cart cart_products_fk; Type: FK CONSTRAINT; Schema: aiwebshop; Owner: postgres
--

ALTER TABLE ONLY aiwebshop.cart
    ADD CONSTRAINT cart_products_fk FOREIGN KEY (product_id) REFERENCES aiwebshop.products(product_id);


--
-- Name: cart cart_users_fk; Type: FK CONSTRAINT; Schema: aiwebshop; Owner: postgres
--

ALTER TABLE ONLY aiwebshop.cart
    ADD CONSTRAINT cart_users_fk FOREIGN KEY (user_id) REFERENCES aiwebshop.users(user_id);


--
-- Name: chat_messages chat_messages_users_fk; Type: FK CONSTRAINT; Schema: aiwebshop; Owner: postgres
--

ALTER TABLE ONLY aiwebshop.chat_messages
    ADD CONSTRAINT chat_messages_users_fk FOREIGN KEY (user_id) REFERENCES aiwebshop.users(user_id);


--
-- Name: order_items order_items_orders_fk; Type: FK CONSTRAINT; Schema: aiwebshop; Owner: postgres
--

ALTER TABLE ONLY aiwebshop.order_items
    ADD CONSTRAINT order_items_orders_fk FOREIGN KEY (order_id) REFERENCES aiwebshop.orders(order_id);


--
-- Name: order_items order_items_products_fk; Type: FK CONSTRAINT; Schema: aiwebshop; Owner: postgres
--

ALTER TABLE ONLY aiwebshop.order_items
    ADD CONSTRAINT order_items_products_fk FOREIGN KEY (product_id) REFERENCES aiwebshop.products(product_id);


--
-- Name: orders orders_addresses_fk; Type: FK CONSTRAINT; Schema: aiwebshop; Owner: postgres
--

ALTER TABLE ONLY aiwebshop.orders
    ADD CONSTRAINT orders_addresses_fk FOREIGN KEY (address_id) REFERENCES aiwebshop.addresses(address_id);


--
-- Name: orders orders_payment_type_fk; Type: FK CONSTRAINT; Schema: aiwebshop; Owner: postgres
--

ALTER TABLE ONLY aiwebshop.orders
    ADD CONSTRAINT orders_payment_type_fk FOREIGN KEY (payment_type_id) REFERENCES aiwebshop.payment_type(payment_type_id);


--
-- Name: orders orders_shipment_type_fk; Type: FK CONSTRAINT; Schema: aiwebshop; Owner: postgres
--

ALTER TABLE ONLY aiwebshop.orders
    ADD CONSTRAINT orders_shipment_type_fk FOREIGN KEY (shipping_type_id) REFERENCES aiwebshop.shipment_type(shipment_type_id);


--
-- Name: orders orders_users_fk; Type: FK CONSTRAINT; Schema: aiwebshop; Owner: postgres
--

ALTER TABLE ONLY aiwebshop.orders
    ADD CONSTRAINT orders_users_fk FOREIGN KEY (user_id) REFERENCES aiwebshop.users(user_id);


--
-- Name: products products_categories_fk; Type: FK CONSTRAINT; Schema: aiwebshop; Owner: postgres
--

ALTER TABLE ONLY aiwebshop.products
    ADD CONSTRAINT products_categories_fk FOREIGN KEY (category_id) REFERENCES aiwebshop.categories(category_id);


--
-- Name: sub_category products_sub_category_categories_fk; Type: FK CONSTRAINT; Schema: aiwebshop; Owner: postgres
--

ALTER TABLE ONLY aiwebshop.sub_category
    ADD CONSTRAINT products_sub_category_categories_fk FOREIGN KEY (category_id) REFERENCES aiwebshop.categories(category_id);


--
-- Name: products products_sub_category_fk; Type: FK CONSTRAINT; Schema: aiwebshop; Owner: postgres
--

ALTER TABLE ONLY aiwebshop.products
    ADD CONSTRAINT products_sub_category_fk FOREIGN KEY (sub_category_id) REFERENCES aiwebshop.sub_category(sub_category_id);


--
-- Name: reviews reviews_products_fk; Type: FK CONSTRAINT; Schema: aiwebshop; Owner: postgres
--

ALTER TABLE ONLY aiwebshop.reviews
    ADD CONSTRAINT reviews_products_fk FOREIGN KEY (product_id) REFERENCES aiwebshop.products(product_id);


--
-- Name: reviews reviews_users_fk; Type: FK CONSTRAINT; Schema: aiwebshop; Owner: postgres
--

ALTER TABLE ONLY aiwebshop.reviews
    ADD CONSTRAINT reviews_users_fk FOREIGN KEY (user_id) REFERENCES aiwebshop.users(user_id);


--
-- PostgreSQL database dump complete
--

