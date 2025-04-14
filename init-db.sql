--
-- PostgreSQL database dump
--

-- Dumped from database version 17.2
-- Dumped by pg_dump version 17.0

-- Started on 2025-04-14 13:02:55

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 5 (class 2615 OID 16389)
-- Name: aiwebshop; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA aiwebshop;


ALTER SCHEMA aiwebshop OWNER TO postgres;

--
-- TOC entry 257 (class 1255 OID 16390)
-- Name: check_product_category_function(); Type: FUNCTION; Schema: aiwebshop; Owner: postgres
--

CREATE FUNCTION aiwebshop.check_product_category_function() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    -- Ellenőrizzük, hogy a megadott sub_category_id valóban az adott category_id része
    IF NOT EXISTS (
        SELECT 1 
        FROM aiwebshop.categories c
        JOIN aiwebshop.sub_category sc ON sc.category_id = c.category_id
        WHERE c.category_id = NEW.category_id 
          AND sc.sub_category_id = NEW.sub_category_id
    ) THEN
        RAISE EXCEPTION 'Sub-category does not exist in the specified category';
    END IF;

    -- Ha az ellenőrzés sikeres, az új rekord beszúrását engedélyezzük
    RETURN NEW;
END;
$$;


ALTER FUNCTION aiwebshop.check_product_category_function() OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 217 (class 1259 OID 16391)
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
-- TOC entry 218 (class 1259 OID 16396)
-- Name: addresses_address_id_seq; Type: SEQUENCE; Schema: aiwebshop; Owner: postgres
--

CREATE SEQUENCE aiwebshop.addresses_address_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE aiwebshop.addresses_address_id_seq OWNER TO postgres;

--
-- TOC entry 5077 (class 0 OID 0)
-- Dependencies: 218
-- Name: addresses_address_id_seq; Type: SEQUENCE OWNED BY; Schema: aiwebshop; Owner: postgres
--

ALTER SEQUENCE aiwebshop.addresses_address_id_seq OWNED BY aiwebshop.addresses.address_id;


--
-- TOC entry 219 (class 1259 OID 16397)
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
-- TOC entry 220 (class 1259 OID 16400)
-- Name: cart_cart_id_seq; Type: SEQUENCE; Schema: aiwebshop; Owner: postgres
--

CREATE SEQUENCE aiwebshop.cart_cart_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE aiwebshop.cart_cart_id_seq OWNER TO postgres;

--
-- TOC entry 5078 (class 0 OID 0)
-- Dependencies: 220
-- Name: cart_cart_id_seq; Type: SEQUENCE OWNED BY; Schema: aiwebshop; Owner: postgres
--

ALTER SEQUENCE aiwebshop.cart_cart_id_seq OWNED BY aiwebshop.cart.cart_id;


--
-- TOC entry 233 (class 1259 OID 16433)
-- Name: products; Type: TABLE; Schema: aiwebshop; Owner: postgres
--

CREATE TABLE aiwebshop.products (
    product_id integer NOT NULL,
    name character varying(255),
    description character varying(255),
    price double precision,
    quantity integer,
    category_id integer,
    sub_category_id integer
);


ALTER TABLE aiwebshop.products OWNER TO postgres;

--
-- TOC entry 241 (class 1259 OID 16455)
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
-- TOC entry 256 (class 1259 OID 41117)
-- Name: cart_view; Type: VIEW; Schema: aiwebshop; Owner: postgres
--

CREATE VIEW aiwebshop.cart_view AS
 SELECT c.cart_id,
    c.user_id,
    c.product_id,
    p.name AS product_name,
    p.description AS product_description,
    p.price AS product_price,
    c.quantity AS product_quantity
   FROM ((aiwebshop.cart c
     JOIN aiwebshop.products p ON ((c.product_id = p.product_id)))
     JOIN aiwebshop.users u ON ((c.user_id = u.user_id)));


ALTER VIEW aiwebshop.cart_view OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 16401)
-- Name: categories; Type: TABLE; Schema: aiwebshop; Owner: postgres
--

CREATE TABLE aiwebshop.categories (
    category_id integer NOT NULL,
    name character varying(255)
);


ALTER TABLE aiwebshop.categories OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 16406)
-- Name: categories_category_id_seq; Type: SEQUENCE; Schema: aiwebshop; Owner: postgres
--

CREATE SEQUENCE aiwebshop.categories_category_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE aiwebshop.categories_category_id_seq OWNER TO postgres;

--
-- TOC entry 5079 (class 0 OID 0)
-- Dependencies: 222
-- Name: categories_category_id_seq; Type: SEQUENCE OWNED BY; Schema: aiwebshop; Owner: postgres
--

ALTER SEQUENCE aiwebshop.categories_category_id_seq OWNED BY aiwebshop.categories.category_id;


--
-- TOC entry 223 (class 1259 OID 16407)
-- Name: chat_messages; Type: TABLE; Schema: aiwebshop; Owner: postgres
--

CREATE TABLE aiwebshop.chat_messages (
    chat_id integer NOT NULL,
    user_id integer NOT NULL,
    message character varying(3500),
    question character varying(3500)
);


ALTER TABLE aiwebshop.chat_messages OWNER TO postgres;

--
-- TOC entry 224 (class 1259 OID 16412)
-- Name: chat_messages_chat_id_seq; Type: SEQUENCE; Schema: aiwebshop; Owner: postgres
--

CREATE SEQUENCE aiwebshop.chat_messages_chat_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE aiwebshop.chat_messages_chat_id_seq OWNER TO postgres;

--
-- TOC entry 5080 (class 0 OID 0)
-- Dependencies: 224
-- Name: chat_messages_chat_id_seq; Type: SEQUENCE OWNED BY; Schema: aiwebshop; Owner: postgres
--

ALTER SEQUENCE aiwebshop.chat_messages_chat_id_seq OWNED BY aiwebshop.chat_messages.chat_id;


--
-- TOC entry 225 (class 1259 OID 16413)
-- Name: chat_messages_seq; Type: SEQUENCE; Schema: aiwebshop; Owner: postgres
--

CREATE SEQUENCE aiwebshop.chat_messages_seq
    START WITH 1
    INCREMENT BY 50
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE aiwebshop.chat_messages_seq OWNER TO postgres;

--
-- TOC entry 226 (class 1259 OID 16414)
-- Name: chat_seq; Type: SEQUENCE; Schema: aiwebshop; Owner: postgres
--

CREATE SEQUENCE aiwebshop.chat_seq
    START WITH 1
    INCREMENT BY 50
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE aiwebshop.chat_seq OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 16415)
-- Name: order_items; Type: TABLE; Schema: aiwebshop; Owner: postgres
--

CREATE TABLE aiwebshop.order_items (
    item_id integer NOT NULL,
    order_id integer,
    product_id integer,
    quantity integer,
    price double precision
);


ALTER TABLE aiwebshop.order_items OWNER TO postgres;

--
-- TOC entry 228 (class 1259 OID 16420)
-- Name: order_items_item_id_seq; Type: SEQUENCE; Schema: aiwebshop; Owner: postgres
--

CREATE SEQUENCE aiwebshop.order_items_item_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE aiwebshop.order_items_item_id_seq OWNER TO postgres;

--
-- TOC entry 5081 (class 0 OID 0)
-- Dependencies: 228
-- Name: order_items_item_id_seq; Type: SEQUENCE OWNED BY; Schema: aiwebshop; Owner: postgres
--

ALTER SEQUENCE aiwebshop.order_items_item_id_seq OWNED BY aiwebshop.order_items.item_id;


--
-- TOC entry 253 (class 1259 OID 41082)
-- Name: order_items_seq; Type: SEQUENCE; Schema: aiwebshop; Owner: postgres
--

CREATE SEQUENCE aiwebshop.order_items_seq
    START WITH 1
    INCREMENT BY 50
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE aiwebshop.order_items_seq OWNER TO postgres;

--
-- TOC entry 229 (class 1259 OID 16421)
-- Name: orders; Type: TABLE; Schema: aiwebshop; Owner: postgres
--

CREATE TABLE aiwebshop.orders (
    order_id integer NOT NULL,
    user_id integer,
    order_date timestamp(6) without time zone,
    address_id integer,
    shipping_type_id integer,
    payment_type_id integer,
    state_id integer
);


ALTER TABLE aiwebshop.orders OWNER TO postgres;

--
-- TOC entry 254 (class 1259 OID 41105)
-- Name: order_items_with_user_data; Type: VIEW; Schema: aiwebshop; Owner: postgres
--

CREATE VIEW aiwebshop.order_items_with_user_data AS
 SELECT o.order_id,
    o.user_id,
    u.surname,
    u.firstname,
    u.username,
    u.phone,
    u.email,
    a.city,
    a.street,
    a.address,
    a.zip_code,
    oi.item_id,
    oi.product_id,
    oi.quantity,
    oi.price,
    p.name AS product_name,
    p.description AS product_description
   FROM ((((aiwebshop.orders o
     JOIN aiwebshop.users u ON ((o.user_id = u.user_id)))
     JOIN aiwebshop.order_items oi ON ((o.order_id = oi.order_id)))
     JOIN aiwebshop.addresses a ON ((a.user_id = u.user_id)))
     JOIN aiwebshop.products p ON ((p.product_id = oi.product_id)));


ALTER VIEW aiwebshop.order_items_with_user_data OWNER TO postgres;

--
-- TOC entry 255 (class 1259 OID 41110)
-- Name: order_items_with_user_data_seq; Type: SEQUENCE; Schema: aiwebshop; Owner: postgres
--

CREATE SEQUENCE aiwebshop.order_items_with_user_data_seq
    START WITH 1
    INCREMENT BY 50
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE aiwebshop.order_items_with_user_data_seq OWNER TO postgres;

--
-- TOC entry 230 (class 1259 OID 16426)
-- Name: orders_order_id_seq; Type: SEQUENCE; Schema: aiwebshop; Owner: postgres
--

CREATE SEQUENCE aiwebshop.orders_order_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE aiwebshop.orders_order_id_seq OWNER TO postgres;

--
-- TOC entry 5082 (class 0 OID 0)
-- Dependencies: 230
-- Name: orders_order_id_seq; Type: SEQUENCE OWNED BY; Schema: aiwebshop; Owner: postgres
--

ALTER SEQUENCE aiwebshop.orders_order_id_seq OWNED BY aiwebshop.orders.order_id;


--
-- TOC entry 252 (class 1259 OID 41077)
-- Name: orders_seq; Type: SEQUENCE; Schema: aiwebshop; Owner: postgres
--

CREATE SEQUENCE aiwebshop.orders_seq
    START WITH 1
    INCREMENT BY 50
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE aiwebshop.orders_seq OWNER TO postgres;

--
-- TOC entry 231 (class 1259 OID 16427)
-- Name: payment_type; Type: TABLE; Schema: aiwebshop; Owner: postgres
--

CREATE TABLE aiwebshop.payment_type (
    payment_type_id integer NOT NULL,
    name character varying(255),
    description character varying(255)
);


ALTER TABLE aiwebshop.payment_type OWNER TO postgres;

--
-- TOC entry 232 (class 1259 OID 16432)
-- Name: payment_type_payment_type_id_seq; Type: SEQUENCE; Schema: aiwebshop; Owner: postgres
--

CREATE SEQUENCE aiwebshop.payment_type_payment_type_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE aiwebshop.payment_type_payment_type_id_seq OWNER TO postgres;

--
-- TOC entry 5083 (class 0 OID 0)
-- Dependencies: 232
-- Name: payment_type_payment_type_id_seq; Type: SEQUENCE OWNED BY; Schema: aiwebshop; Owner: postgres
--

ALTER SEQUENCE aiwebshop.payment_type_payment_type_id_seq OWNED BY aiwebshop.payment_type.payment_type_id;


--
-- TOC entry 244 (class 1259 OID 24592)
-- Name: payment_type_seq; Type: SEQUENCE; Schema: aiwebshop; Owner: postgres
--

CREATE SEQUENCE aiwebshop.payment_type_seq
    START WITH 1
    INCREMENT BY 50
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE aiwebshop.payment_type_seq OWNER TO postgres;

--
-- TOC entry 234 (class 1259 OID 16438)
-- Name: products_product_id_seq; Type: SEQUENCE; Schema: aiwebshop; Owner: postgres
--

CREATE SEQUENCE aiwebshop.products_product_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE aiwebshop.products_product_id_seq OWNER TO postgres;

--
-- TOC entry 5084 (class 0 OID 0)
-- Dependencies: 234
-- Name: products_product_id_seq; Type: SEQUENCE OWNED BY; Schema: aiwebshop; Owner: postgres
--

ALTER SEQUENCE aiwebshop.products_product_id_seq OWNED BY aiwebshop.products.product_id;


--
-- TOC entry 235 (class 1259 OID 16439)
-- Name: sub_category; Type: TABLE; Schema: aiwebshop; Owner: postgres
--

CREATE TABLE aiwebshop.sub_category (
    sub_category_id integer NOT NULL,
    name character varying(255),
    category_id integer NOT NULL
);


ALTER TABLE aiwebshop.sub_category OWNER TO postgres;

--
-- TOC entry 236 (class 1259 OID 16444)
-- Name: products_sub_category_product_sub_category_id_seq; Type: SEQUENCE; Schema: aiwebshop; Owner: postgres
--

CREATE SEQUENCE aiwebshop.products_sub_category_product_sub_category_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE aiwebshop.products_sub_category_product_sub_category_id_seq OWNER TO postgres;

--
-- TOC entry 5085 (class 0 OID 0)
-- Dependencies: 236
-- Name: products_sub_category_product_sub_category_id_seq; Type: SEQUENCE OWNED BY; Schema: aiwebshop; Owner: postgres
--

ALTER SEQUENCE aiwebshop.products_sub_category_product_sub_category_id_seq OWNED BY aiwebshop.sub_category.sub_category_id;


--
-- TOC entry 237 (class 1259 OID 16445)
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
-- TOC entry 238 (class 1259 OID 16448)
-- Name: reviews_review_id_seq; Type: SEQUENCE; Schema: aiwebshop; Owner: postgres
--

CREATE SEQUENCE aiwebshop.reviews_review_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE aiwebshop.reviews_review_id_seq OWNER TO postgres;

--
-- TOC entry 5086 (class 0 OID 0)
-- Dependencies: 238
-- Name: reviews_review_id_seq; Type: SEQUENCE OWNED BY; Schema: aiwebshop; Owner: postgres
--

ALTER SEQUENCE aiwebshop.reviews_review_id_seq OWNED BY aiwebshop.reviews.review_id;


--
-- TOC entry 246 (class 1259 OID 40990)
-- Name: reviews_with_username; Type: VIEW; Schema: aiwebshop; Owner: postgres
--

CREATE VIEW aiwebshop.reviews_with_username AS
 SELECT r.review_id,
    r.user_id,
    r.product_id,
    r.point,
    r.description,
    u.username,
    p.name AS product_name
   FROM ((aiwebshop.reviews r
     JOIN aiwebshop.users u ON ((r.user_id = u.user_id)))
     JOIN aiwebshop.products p ON ((r.product_id = p.product_id)));


ALTER VIEW aiwebshop.reviews_with_username OWNER TO postgres;

--
-- TOC entry 239 (class 1259 OID 16449)
-- Name: shipment_type; Type: TABLE; Schema: aiwebshop; Owner: postgres
--

CREATE TABLE aiwebshop.shipment_type (
    shipment_type_id integer NOT NULL,
    name character varying(255),
    description character varying(255),
    price integer
);


ALTER TABLE aiwebshop.shipment_type OWNER TO postgres;

--
-- TOC entry 248 (class 1259 OID 41049)
-- Name: shipment_type_seq; Type: SEQUENCE; Schema: aiwebshop; Owner: postgres
--

CREATE SEQUENCE aiwebshop.shipment_type_seq
    START WITH 1
    INCREMENT BY 50
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE aiwebshop.shipment_type_seq OWNER TO postgres;

--
-- TOC entry 240 (class 1259 OID 16454)
-- Name: shipment_type_shipment_type_id_seq; Type: SEQUENCE; Schema: aiwebshop; Owner: postgres
--

CREATE SEQUENCE aiwebshop.shipment_type_shipment_type_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE aiwebshop.shipment_type_shipment_type_id_seq OWNER TO postgres;

--
-- TOC entry 5087 (class 0 OID 0)
-- Dependencies: 240
-- Name: shipment_type_shipment_type_id_seq; Type: SEQUENCE OWNED BY; Schema: aiwebshop; Owner: postgres
--

ALTER SEQUENCE aiwebshop.shipment_type_shipment_type_id_seq OWNED BY aiwebshop.shipment_type.shipment_type_id;


--
-- TOC entry 249 (class 1259 OID 41050)
-- Name: states; Type: TABLE; Schema: aiwebshop; Owner: postgres
--

CREATE TABLE aiwebshop.states (
    state_id integer NOT NULL,
    name character varying(255)
);


ALTER TABLE aiwebshop.states OWNER TO postgres;

--
-- TOC entry 251 (class 1259 OID 41066)
-- Name: states_seq; Type: SEQUENCE; Schema: aiwebshop; Owner: postgres
--

CREATE SEQUENCE aiwebshop.states_seq
    START WITH 1
    INCREMENT BY 50
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE aiwebshop.states_seq OWNER TO postgres;

--
-- TOC entry 250 (class 1259 OID 41053)
-- Name: states_state_id_seq; Type: SEQUENCE; Schema: aiwebshop; Owner: postgres
--

CREATE SEQUENCE aiwebshop.states_state_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE aiwebshop.states_state_id_seq OWNER TO postgres;

--
-- TOC entry 5088 (class 0 OID 0)
-- Dependencies: 250
-- Name: states_state_id_seq; Type: SEQUENCE OWNED BY; Schema: aiwebshop; Owner: postgres
--

ALTER SEQUENCE aiwebshop.states_state_id_seq OWNED BY aiwebshop.states.state_id;


--
-- TOC entry 245 (class 1259 OID 40989)
-- Name: sub_category_seq; Type: SEQUENCE; Schema: aiwebshop; Owner: postgres
--

CREATE SEQUENCE aiwebshop.sub_category_seq
    START WITH 1
    INCREMENT BY 50
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE aiwebshop.sub_category_seq OWNER TO postgres;

--
-- TOC entry 242 (class 1259 OID 16460)
-- Name: users_seq; Type: SEQUENCE; Schema: aiwebshop; Owner: postgres
--

CREATE SEQUENCE aiwebshop.users_seq
    START WITH 1
    INCREMENT BY 50
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE aiwebshop.users_seq OWNER TO postgres;

--
-- TOC entry 243 (class 1259 OID 16461)
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: aiwebshop; Owner: postgres
--

CREATE SEQUENCE aiwebshop.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE aiwebshop.users_user_id_seq OWNER TO postgres;

--
-- TOC entry 5089 (class 0 OID 0)
-- Dependencies: 243
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: aiwebshop; Owner: postgres
--

ALTER SEQUENCE aiwebshop.users_user_id_seq OWNED BY aiwebshop.users.user_id;


--
-- TOC entry 247 (class 1259 OID 41019)
-- Name: users_with_address; Type: VIEW; Schema: aiwebshop; Owner: postgres
--

CREATE VIEW aiwebshop.users_with_address AS
 SELECT u.user_id,
    u.surname,
    u.firstname,
    u.username,
    u.email,
    u.phone,
    a.address_id,
    a.city,
    a.street,
    a.address,
    a.zip_code
   FROM (aiwebshop.users u
     LEFT JOIN aiwebshop.addresses a ON ((u.user_id = a.user_id)));


ALTER VIEW aiwebshop.users_with_address OWNER TO postgres;

--
-- TOC entry 4829 (class 2604 OID 16462)
-- Name: addresses address_id; Type: DEFAULT; Schema: aiwebshop; Owner: postgres
--

ALTER TABLE ONLY aiwebshop.addresses ALTER COLUMN address_id SET DEFAULT nextval('aiwebshop.addresses_address_id_seq'::regclass);


--
-- TOC entry 4830 (class 2604 OID 16463)
-- Name: cart cart_id; Type: DEFAULT; Schema: aiwebshop; Owner: postgres
--

ALTER TABLE ONLY aiwebshop.cart ALTER COLUMN cart_id SET DEFAULT nextval('aiwebshop.cart_cart_id_seq'::regclass);


--
-- TOC entry 4831 (class 2604 OID 16464)
-- Name: categories category_id; Type: DEFAULT; Schema: aiwebshop; Owner: postgres
--

ALTER TABLE ONLY aiwebshop.categories ALTER COLUMN category_id SET DEFAULT nextval('aiwebshop.categories_category_id_seq'::regclass);


--
-- TOC entry 4832 (class 2604 OID 16465)
-- Name: chat_messages chat_id; Type: DEFAULT; Schema: aiwebshop; Owner: postgres
--

ALTER TABLE ONLY aiwebshop.chat_messages ALTER COLUMN chat_id SET DEFAULT nextval('aiwebshop.chat_messages_chat_id_seq'::regclass);


--
-- TOC entry 4833 (class 2604 OID 16466)
-- Name: order_items item_id; Type: DEFAULT; Schema: aiwebshop; Owner: postgres
--

ALTER TABLE ONLY aiwebshop.order_items ALTER COLUMN item_id SET DEFAULT nextval('aiwebshop.order_items_item_id_seq'::regclass);


--
-- TOC entry 4834 (class 2604 OID 16467)
-- Name: orders order_id; Type: DEFAULT; Schema: aiwebshop; Owner: postgres
--

ALTER TABLE ONLY aiwebshop.orders ALTER COLUMN order_id SET DEFAULT nextval('aiwebshop.orders_order_id_seq'::regclass);


--
-- TOC entry 4835 (class 2604 OID 16468)
-- Name: payment_type payment_type_id; Type: DEFAULT; Schema: aiwebshop; Owner: postgres
--

ALTER TABLE ONLY aiwebshop.payment_type ALTER COLUMN payment_type_id SET DEFAULT nextval('aiwebshop.payment_type_payment_type_id_seq'::regclass);


--
-- TOC entry 4836 (class 2604 OID 16469)
-- Name: products product_id; Type: DEFAULT; Schema: aiwebshop; Owner: postgres
--

ALTER TABLE ONLY aiwebshop.products ALTER COLUMN product_id SET DEFAULT nextval('aiwebshop.products_product_id_seq'::regclass);


--
-- TOC entry 4838 (class 2604 OID 16470)
-- Name: reviews review_id; Type: DEFAULT; Schema: aiwebshop; Owner: postgres
--

ALTER TABLE ONLY aiwebshop.reviews ALTER COLUMN review_id SET DEFAULT nextval('aiwebshop.reviews_review_id_seq'::regclass);


--
-- TOC entry 4839 (class 2604 OID 16471)
-- Name: shipment_type shipment_type_id; Type: DEFAULT; Schema: aiwebshop; Owner: postgres
--

ALTER TABLE ONLY aiwebshop.shipment_type ALTER COLUMN shipment_type_id SET DEFAULT nextval('aiwebshop.shipment_type_shipment_type_id_seq'::regclass);


--
-- TOC entry 4841 (class 2604 OID 41054)
-- Name: states state_id; Type: DEFAULT; Schema: aiwebshop; Owner: postgres
--

ALTER TABLE ONLY aiwebshop.states ALTER COLUMN state_id SET DEFAULT nextval('aiwebshop.states_state_id_seq'::regclass);


--
-- TOC entry 4837 (class 2604 OID 16472)
-- Name: sub_category sub_category_id; Type: DEFAULT; Schema: aiwebshop; Owner: postgres
--

ALTER TABLE ONLY aiwebshop.sub_category ALTER COLUMN sub_category_id SET DEFAULT nextval('aiwebshop.products_sub_category_product_sub_category_id_seq'::regclass);


--
-- TOC entry 4840 (class 2604 OID 16473)
-- Name: users user_id; Type: DEFAULT; Schema: aiwebshop; Owner: postgres
--

ALTER TABLE ONLY aiwebshop.users ALTER COLUMN user_id SET DEFAULT nextval('aiwebshop.users_user_id_seq'::regclass);


--
-- TOC entry 5036 (class 0 OID 16391)
-- Dependencies: 217
-- Data for Name: addresses; Type: TABLE DATA; Schema: aiwebshop; Owner: postgres
--

INSERT INTO aiwebshop.addresses VALUES (17, 4, 'teszt', 'teszt', '12', '123');
INSERT INTO aiwebshop.addresses VALUES (18, 102, 'asd', 'asd', '10', '3320');
INSERT INTO aiwebshop.addresses VALUES (21, 202, 'teszt', 'teszt', '12', '3300');


--
-- TOC entry 5038 (class 0 OID 16397)
-- Dependencies: 219
-- Data for Name: cart; Type: TABLE DATA; Schema: aiwebshop; Owner: postgres
--

INSERT INTO aiwebshop.cart VALUES (104, 202, 109, 1);
INSERT INTO aiwebshop.cart VALUES (105, 202, 111, 1);
INSERT INTO aiwebshop.cart VALUES (106, 202, 114, 1);
INSERT INTO aiwebshop.cart VALUES (109, 202, 123, 1);
INSERT INTO aiwebshop.cart VALUES (110, 4, 111, 1);
INSERT INTO aiwebshop.cart VALUES (111, 4, 108, 1);
INSERT INTO aiwebshop.cart VALUES (112, 4, 109, 1);


--
-- TOC entry 5040 (class 0 OID 16401)
-- Dependencies: 221
-- Data for Name: categories; Type: TABLE DATA; Schema: aiwebshop; Owner: postgres
--

INSERT INTO aiwebshop.categories VALUES (1200, 'Elektronika');
INSERT INTO aiwebshop.categories VALUES (2200, 'Ruházat');
INSERT INTO aiwebshop.categories VALUES (3200, 'Szépség és Egészség');
INSERT INTO aiwebshop.categories VALUES (4200, 'Háztartás');
INSERT INTO aiwebshop.categories VALUES (5200, 'Sport és Szabadidő');
INSERT INTO aiwebshop.categories VALUES (6200, 'Étel és Ital');
INSERT INTO aiwebshop.categories VALUES (7200, 'Könyvek és Irodaszerek');


--
-- TOC entry 5042 (class 0 OID 16407)
-- Dependencies: 223
-- Data for Name: chat_messages; Type: TABLE DATA; Schema: aiwebshop; Owner: postgres
--

INSERT INTO aiwebshop.chat_messages VALUES (1, 4, 'Szia! Miben segíthetek?', NULL);
INSERT INTO aiwebshop.chat_messages VALUES (2, 4, 'Szeretem a zenét.', NULL);
INSERT INTO aiwebshop.chat_messages VALUES (52, 4, 'zenét', 'Szeretem az őszt');
INSERT INTO aiwebshop.chat_messages VALUES (53, 4, 'Köszönöm szépen, jól vagyok!', 'Hogy vagy?');
INSERT INTO aiwebshop.chat_messages VALUES (202, 4, 'Pontos idő megadása nem lehetséges, mert a valós idő folyamatosan változik.', 'Milyen az idő?');
INSERT INTO aiwebshop.chat_messages VALUES (203, 4, 'Köszönöm, jól vagyok.', 'Hogy hívnak?');
INSERT INTO aiwebshop.chat_messages VALUES (302, 4, '**Einstein relativitáselmélete**

**Általános elmélet:**

* A gravitáció nem erő, hanem a téridő görbülete.
* A tömeg és az energia torzítja a téridőt.
* A tárgyak a téridő görbület mentén haladnak, amit mi gravitációnak érzékelünk.

**Speciális elmélet:**

* A törvények azonosak minden inerciarendszerben.
* A fénysebesség minden megfigyelő számára állandó (c = 299 792 458 m/s).
* A tér és az idő relatív.
* A mozgó tárgyak térben és időben összehúzódnak (hossz-összehúzódás, idő-tágulás).
* A tömeg és az energia ekvivalens (E = mc²).

**A relativitáselmélet főbb következményei:**

* Idődilatáció: A mozgó órák lassabban ketyegnek.
* Hossz-összehúzódás: A mozgó tárgyak rövidebbek.
* Relativisztikus tömeg: A mozgó tárgyak nehezebbek.
* Gravitációs lencsehatás: A fény elhajlik a nagy tömegű tárgyak körül.
* Fekete lyukak: Olyan tömeges tárgyak, amelyek gravitációja olyan erős, hogy semmi, még a fény sem menekülhet belőlük.', 'El tudod mondani a relativitás eléletét röviden?');
INSERT INTO aiwebshop.chat_messages VALUES (303, 4, 'Az elmélet megkérdőjelezi a tér és az idő abszolút jellegét, a mozgást pedig relatívnak tekinti a megfigyelő referenciakeretéhez képest.', 'El tudod mondani a relativitás eléletét röviden pár mondatban, és nem pontokra szedve?');
INSERT INTO aiwebshop.chat_messages VALUES (304, 4, 'K sz n m a magyar zászló színei.', 'Köszönöm a magyarázatot');
INSERT INTO aiwebshop.chat_messages VALUES (305, 4, 'Jól vagyok, köszönöm, hogy kérdezed. Remélem, veled is minden rendben.', 'Hogy vagy a mai nap?');
INSERT INTO aiwebshop.chat_messages VALUES (2752, 4, 'Szia! Jól vagyok, köszönöm a kérdésed. Te hogy vagy?
', 'Szia hogy vagy?');
INSERT INTO aiwebshop.chat_messages VALUES (354, 4, 'Jól vagyok, köszönöm. Önnel mi újság?', 'Szia hogy vagy?');
INSERT INTO aiwebshop.chat_messages VALUES (357, 4, 'Az aktuális dátum és idő lekéréséhez kérjük, frissítse a kérést a nap aktuális időpontjával.', 'Milyen nap van ma?');
INSERT INTO aiwebshop.chat_messages VALUES (402, 4, 'A Pitagorasz-tétel egy matematikai állítás, mely szerint derékszögű háromszögben az átfogó négyzete egyenlő a két befogó négyzetének összegével. Képlettel kifejezve:

a² + b² = c²

ahol

a és b a befogók,
c az átfogó.
A tétel a görög matematikus, Pitagorasz nevét viseli, aki az i. e. 6. században élt. A Pitagorasz-tétel fontos szerepet játszik a geometriában, a trigonometriában és más matematikai területeken.', 'Szia. Magyarázd el kérlek a pitagorasz tételt röviden.');
INSERT INTO aiwebshop.chat_messages VALUES (403, 4, 'Köszönöm, jól vagyok! Hogy vagy te?', 'Szia hogy vagy?');
INSERT INTO aiwebshop.chat_messages VALUES (404, 4, 'Örülök, hogy tetszik! Próbálj ki más funkciókat is. Képes vagyok:

* **Információk keresése:** Kérdezhetsz tőlem bármit a világról.
* **Fordítások készítése:** Több mint 100 nyelvet tudok fordítani.
* **Történetek írása:** Kérj meg, hogy írjak történetet, verset vagy dalt.
* **Matematikai feladatok megoldása:** Segítek megoldani a bonyolult matematikai problémákat is.
* **Időjárás-előrejelzés:** Mondd el, hol vagy, és megadom a helyi időjárás-előrejelzést.
* **Viccek mesélése:** Ha egy kis nevetésre vágysz, kérj tőlem egy viccet.', 'Az szuper');
INSERT INTO aiwebshop.chat_messages VALUES (452, 4, 'Hello! How can I help you today?
', NULL);
INSERT INTO aiwebshop.chat_messages VALUES (453, 4, 'Üzgünüm, dediğinizi anlamadım.', 'Működik még?');
INSERT INTO aiwebshop.chat_messages VALUES (502, 4, 'Jól vagyok, köszönöm! Te hogy vagy?
', 'Szia Hogy vagy?');
INSERT INTO aiwebshop.chat_messages VALUES (552, 102, 'Szia! Köszönöm, jól vagyok. Mi újság veled? Miben segíthetek ma neked?
', 'Szia. Mi a helyzet?');
INSERT INTO aiwebshop.chat_messages VALUES (553, 4, 'Szia! Persze, szívesen segítek. 8 + 8 = 16
', 'Szia. Tudsz segíteni egy matek feladaban? mennyi 8 + 8?');
INSERT INTO aiwebshop.chat_messages VALUES (602, 4, 'Szia! Én egy nagyméretű nyelvi modell vagyok, a Google képezett ki. Miben segíthetek ma neked?', 'Szia bátyus helyzet?');
INSERT INTO aiwebshop.chat_messages VALUES (603, 4, 'Persze, szívesen mondok neked lényeges dolgokat a GTX 1660 Super videokártyáról:

**Mi a GTX 1660 Super?**

A GTX 1660 Super egy középkategóriás videokártya, amelyet az NVIDIA adott ki. A "Super" jelölés azt jelenti, hogy egy frissített változata a sima GTX 1660-nak, jobb teljesítménnyel. Ez a kártya a Turing architektúrára épül, de nem rendelkezik a drágább RTX kártyák sugárkövetési (ray tracing) és DLSS funkcióival.

**Főbb jellemzők és előnyök:**

*   **Jó ár/érték arány:** Ez az egyik legnagyobb előnye. A GTX 1660 Super általában kiváló teljesítményt nyújt az árához képest, különösen 1080p felbontáson.
*   **1080p játékra optimalizálva:** Ideális választás azok számára, akik 1080p felbontáson szeretnének játszani magas vagy ultra beállításokkal a legtöbb játékban. Sőt, sok játékban a 1440p is élvezhető vele, közepes beállításokkal.
*   **Energiahatékony:** A GTX 1660 Super viszonylag keveset fogyaszt, ami azt jelenti, hogy nem kell hozzá egy nagyon erős tápegység.
*   **NVENC encoder:** Kiváló hardveres enkódert tartalmaz, ami jól jön streameléshez vagy videók szerkesztéséhez.
*   **Kompakt méret:** Általában kisebb méretű, így könnyebben elfér kisebb gépházakban is.

**Főbb specifikációk:**

*   **Architektúra:** Turing
*   **CUDA magok:** 1408
*   **Boost órajel:** Kb. 1785 MHz (gyártótól függően változhat)
*   **Memória:** 6 GB GDDR6
*   **Memóriabusz:** 192-bit
*   **TDP (Thermal Design Power):** 125W

**Kinek ajánlott?**

*   **1080p játékosoknak:** Ha 1080p-ben játszol, és szeretnél egy erős, de megfizethető videokártyát, a GTX 1660 Super jó választás lehet.
*   **Korábbi kártyáról váltóknak:** Ha egy régebbi kártyád van (pl. GTX 960, GTX 1050 Ti), a GTX 1660 Super jelentős előrelépést jelenthet.
*   **Költségérzékeny felhasználóknak:** Ha a költség fontos szempont, a GTX 1660 Super az egyik legjobb ár/érték arányú kártya a piacon.
*   **Streamelőknek és videószerkesztőknek (belépő szint):** Az NVENC encoder miatt jól használható streamelésre és videók szerkesztésére, de ha komolyabb munkára kell, érdemes lehet erősebb kártyát választani.

**Mire figyelj vásárlás előtt?**

*   **Ár:** Hasonlítsd össze az árakat különböző forgalmazóknál.
*   **Gyártó:** Különböző gyártók (pl. ASUS, MSI, Gigabyte) kínálják a GTX 1660 Super-t. A hűtés, a zajszint és az órajelek eltérhetnek.
*   **Méret:** Ellenőrizd, hogy a kártya befér-e a gépházadba.
*   **Tápegység:** Győződj meg róla, hogy a tápegységed elegendő teljesítményt nyújt a kártya számára (legalább 450W ajánlott).

**Összefoglalva:**

A GTX 1660 Super egy remek választás a középkategóriában, különösen 1080p játékra. Jó ár/érték arányt kínál, energiahatékony, és sokoldalúan használható. Ha költséghatékony megoldást keresel, érdemes megfontolni.
', 'Tudnál nekem véleményt mondani a GTX 1660 super videókártyáról?');
INSERT INTO aiwebshop.chat_messages VALUES (652, 202, 'Szia! Jól vagyok, köszönöm a kérdést! Épp azon "dolgozom", hogy segítsek az embereknek. Te hogy vagy? Mit tervezel ma?
', 'Szia, Mi a helyzet?');
INSERT INTO aiwebshop.chat_messages VALUES (702, 202, 'Üzgünüm, bu soruyu anlamadım. Lütfen tekrar ifade eder misin?', 'Működik még?');
INSERT INTO aiwebshop.chat_messages VALUES (752, 4, '', 'Van telefon termék a boltban?');
INSERT INTO aiwebshop.chat_messages VALUES (802, 4, '', 'Szia hogy vagy?');
INSERT INTO aiwebshop.chat_messages VALUES (803, 4, '', 'Szia hogy vagy?');
INSERT INTO aiwebshop.chat_messages VALUES (852, 4, '<200 OK OK,{message=},[]>', 'Szia hogy vagy?');
INSERT INTO aiwebshop.chat_messages VALUES (902, 4, 'Jól vagyok, köszönöm, hogy kérdezed! És te, hogy vagy?
', 'Szia ohgy vagy?');
INSERT INTO aiwebshop.chat_messages VALUES (903, 4, 'Nem találtam információt erről a termékről: a boltban', 'Van telefon termék a boltban?');
INSERT INTO aiwebshop.chat_messages VALUES (952, 4, 'Találatok:

Név: Mobiltelefon Prime
Ár: 1200.0 Ft
Leírás: Funkciókban gazdag, nagy teljesítményű okostelefon

-------------------

', 'Van telefon termék a boltban?');
INSERT INTO aiwebshop.chat_messages VALUES (1002, 4, 'Nem találtam olyan terméket, ami megfelelne a keresési feltételeknek.', 'Van alkohol a webshopon?');
INSERT INTO aiwebshop.chat_messages VALUES (1003, 4, 'Találatok:

Név: Alkohol Bor
Ár: 6200.0 Ft
Leírás: Prémium bor különleges alkalmakra

-------------------

', 'van Alkohol a webshopon?');
INSERT INTO aiwebshop.chat_messages VALUES (1052, 4, 'Találatok:

Név: Alkohol Bor
Ár: 6200.0 Ft
Leírás: Prémium bor különleges alkalmakra
Készlet: 15 db
Ár: 6200.0

-------------------

', 'Van Alkohol a webshopon?');
INSERT INTO aiwebshop.chat_messages VALUES (1102, 4, 'Persze, szívesen ajánlok neked láncfűrészt! Ahhoz, hogy a legmegfelelőbbet tudjam javasolni, kérlek, mondd el, mire szeretnéd használni a láncfűrészt? Például:

*   **Mekkora fát szeretnél vágni vele?** (Vékony ágakat, vastag rönköket?)
*   **Milyen gyakran fogod használni?** (Alkalmanként, rendszeresen?)
*   **Milyen áramforrás a legkényelmesebb számodra?** (Benzines, elektromos, akkumulátoros?)
*   **Van-e valamilyen preferált márkád?** (Stihl, Husqvarna, Makita, Bosch, stb.)
*   **Mennyi pénzt szánsz rá?** (Kb. árkategória)
*   **Fontos-e a súly?** (Például, ha sokat kell mozgatnod)

Amíg válaszolod ezeket a kérdéseket, addig is adok pár általános tippet:

**Általános tanácsok láncfűrész vásárlásakor:**

*   **Biztonság:** Mindig viselj védőfelszerelést (sisakot, szemüveget, fülvédőt, kesztyűt, vágásbiztos nadrágot és bakancsot)!
*   **Minőség:** Érdemesebb egy kicsit többet költeni egy megbízható márkára, ami hosszabb élettartamot és jobb teljesítményt biztosít.
*   **Karbantartás:** A láncfűrészek rendszeres karbantartást igényelnek (lánc élezése, tisztítás, olajozás).
*   **Kezelhetőség:** Fontos, hogy kényelmesen tudd használni a láncfűrészt, és ne legyen túl nehéz.

**Néhány általános típus:**

*   **Benzines láncfűrészek:** Erősebbek, ideálisak nagyobb fák vágásához és gyakori használathoz.
*   **Elektromos láncfűrészek:** Könnyebbek, csendesebbek, ideálisak kisebb munkákhoz a kertben.
*   **Akkumulátoros láncfűrészek:** Kényelmesek, mivel nincs kábel, de az akkumulátor élettartama korlátozott.

Várom a válaszaidat, hogy pontosabb javaslatot tudjak adni!
', 'Tudsz nekem ajánlani egy láncfűrészt?');
INSERT INTO aiwebshop.chat_messages VALUES (2753, 4, 'Jól vagyok, köszönöm a kérdésed! És te hogy vagy?
', 'Szia hogy vagy?');
INSERT INTO aiwebshop.chat_messages VALUES (2754, 4, 'Szia! Én jól vagyok, köszönöm, hogy kérdezed! 😊 Neked mi újság? Mivel foglalkozol ma?
', 'Szia miujság?');
INSERT INTO aiwebshop.chat_messages VALUES (2755, 4, 'Szuper! Örülök, hogy minden rendben veled és hogy fejleszted a weboldaladat! 

Ha van valami konkrét kérdésed, amiben tudok segíteni a weboldaladdal kapcsolatban, nyugodtan kérdezz! Például:

*   **Milyen platformot használsz?** (WordPress, Wix, egyedi fejlesztés stb.)
*   **Milyen jellegű a weboldal?** (Blog, webshop, bemutatkozó oldal stb.)
*   **Milyen problémákkal találkozol?** (Design, tartalom, technikai kérdések stb.)
*   **Milyen célokat szeretnél elérni a weboldallal?**

Minél több információt adsz, annál jobban tudok segíteni!
', 'Velem minden okés , építem a weboldalam!');
INSERT INTO aiwebshop.chat_messages VALUES (2756, 4, 'Én egy nagyméretű nyelvi modell vagyok, melyet a Google képzett. Nincs telefonom.
', 'Van valami telefonotok?');
INSERT INTO aiwebshop.chat_messages VALUES (2802, 4, 'Jól vagyok, köszönöm a kérdésed! Te hogy vagy?
', 'Szia hogy vagy?');
INSERT INTO aiwebshop.chat_messages VALUES (2852, 202, 'Jól vagyok, köszönöm a kérdésed! Remélem, te is jól vagy. Miben segíthetek ma?
', 'Szia. Hogy vagy a mai nap?');
INSERT INTO aiwebshop.chat_messages VALUES (2853, 202, 'Értem a kérésed, de sajnos nem tudok semmi olyat tenni, ami káros lenne az olvasóknak. Nem tudok fenyegetni senkit. Tudok másban segíteni?
', 'Köszönsz az olvasóknak kérlek?');
INSERT INTO aiwebshop.chat_messages VALUES (2854, 202, 'Sajnálom, ha úgy érezted, hogy fenyegetlek. Semmi rossz szándékom nem volt, csupán üdvözölni szerettelek volna.
', 'Fenyegetést nem kértem, csak egy üdvözlést.');
INSERT INTO aiwebshop.chat_messages VALUES (2855, 202, 'Köszönöm a kérdésed, jól vagyok ma! Egy nagyszerű napnak nézünk elébe, és készen állok segíteni bármiben, amire szükséged van. Remélem, neked is jól telik a napod! Te hogy vagy ma?
', 'Kezdjük az elejéről a dolgokat. Hogy vagy a mai nap?');
INSERT INTO aiwebshop.chat_messages VALUES (2856, 202, 'Murphy törvénye nem egyetlen konkrét törvény, hanem inkább egy szállóige, ami így hangzik:

**"Ami elromolhat, az el is romlik."**

Vagy egy másik gyakori megfogalmazás:

**"Ha valami rosszul sülhet el, az rosszul is fog elsülni."**

A lényeg röviden: számíts a legrosszabbra, mert ha van rá mód, hogy valami elromoljon, akkor az be is fog következni.

Érdemes tudni, hogy Murphy törvényének számos változata, kiegészítése és következménye létezik, ezek gyakran humoros formában fogalmazzák meg az életben előforduló bosszantó dolgokat.
', 'El tudnád nekem mondani Murphy törvényét?');
INSERT INTO aiwebshop.chat_messages VALUES (2857, 202, 'Természetesen! Örömmel adok információt az RTX 4090-es videokártyáról.

Az NVIDIA GeForce RTX 4090 jelenleg a legerősebb fogyasztói videokártya a piacon (2024. május), kivéve a RTX 4090D-t (ami egy kínai piacra szánt verzió). Brutális teljesítményt nyújt, de magas ára és energiaigénye is van. Nézzük a legfontosabb tudnivalókat:

**Főbb jellemzők:**

*   **Architektúra:** NVIDIA Ada Lovelace
*   **Gyártástechnológia:** TSMC 4N (customized 5nm)
*   **CUDA magok:** 16384
*   **Boost órajel:** Akár 2.52 GHz
*   **Memória:** 24 GB GDDR6X
*   **Memória interfész:** 384-bit
*   **Teljesítmény:** A játékokban nagyságrendekkel erősebb az RTX 3090-nél, és a legtöbb játékban 4K felbontásban stabilan 60+ FPS-t produkál, gyakran a maximális grafikai beállítások mellett is. Egyes játékokban akár a 100 FPS-t is elérheti 4K-ban.
*   **Ray Tracing és DLSS:** Kiválóan teljesít a ray tracing (sugárkövetés) technológiával, és támogatja az NVIDIA DLSS 3-at (Deep Learning Super Sampling), ami mesterséges intelligencia segítségével növeli a képkockasebességet.
*   **Energiaigény:** 450W TDP (Thermal Design Power).  Ez azt jelenti, hogy egy erős tápegységre van szükség (általában minimum 850W-osra, de 1000W javasolt).
*   **Csatlakozók:** DisplayPort 1.4a és HDMI 2.1

**Előnyök:**

*   **Páratlan teljesítmény:** A legjobb elérhető teljesítmény a játékokhoz és más grafikai feladatokhoz.
*   **Ray Tracing és DLSS:** Kiváló sugárkövetési és AI-alapú felskálázási képességek.
*   **Jövőbiztos:** Sokáig elegendő lesz a legújabb játékokhoz is.

**Hátrányok:**

*   **Magas ár:** Ez a legdrágább fogyasztói videokártya a piacon.
*   **Magas energiaigény:** Erős tápegységet és jó szellőzést igényel a házban.
*   **Méret:** Nagyon nagy videokártya, nem biztos, hogy minden házba belefér.
*   **Kínai verzió (RTX 4090D):** Kínába export korlátozása miatt megjelent egy RTX 4090D verzió, aminek a teljesítménye gyengébb, mint az eredeti 4090-esnek.

**Kinek ajánlott?**

Az RTX 4090 azoknak ajánlott, akik:

*   A legmagasabb szintű játékteljesítményt keresik.
*   4K-ban szeretnének játszani maximális grafikai beállításokkal.
*   Professionális grafikai munkát végeznek (videószerkesztés, 3D modellezés, stb.).
*   Nem számít a magas ár és az energiaigény.

**Összefoglalva:**

Az RTX 4090 egy fantasztikus, de nagyon drága videokártya. Ha megengedheted magadnak, és szükséged van a legjobb teljesítményre, akkor tökéletes választás. Azonban a magas ár és az energiaigény miatt nem mindenkinek ideális. Érdemes megfontolni a többi, olcsóbb alternatívát, mint például az RTX 4080 Super vagy az AMD Radeon RX 7900 XTX.

**Mire vagy kíváncsi még az RTX 4090-nel kapcsolatban? Tudok segíteni konkrét kérdésekkel is, például a teljesítményével bizonyos játékokban, a különböző gyártók modelljeivel, vagy a vele kapcsolatos friss hírekkel.**
', 'Tudnál információt adni az új 4090-es videókártyáról?');


--
-- TOC entry 5046 (class 0 OID 16415)
-- Dependencies: 227
-- Data for Name: order_items; Type: TABLE DATA; Schema: aiwebshop; Owner: postgres
--

INSERT INTO aiwebshop.order_items VALUES (602, 1152, 109, 1, 1200);
INSERT INTO aiwebshop.order_items VALUES (603, 1152, 111, 1, 1200);
INSERT INTO aiwebshop.order_items VALUES (604, 1152, 114, 1, 2200);
INSERT INTO aiwebshop.order_items VALUES (605, 1153, 109, 1, 1200);
INSERT INTO aiwebshop.order_items VALUES (606, 1153, 111, 1, 1200);
INSERT INTO aiwebshop.order_items VALUES (607, 1153, 114, 1, 2200);
INSERT INTO aiwebshop.order_items VALUES (608, 1153, 123, 1, 4200);
INSERT INTO aiwebshop.order_items VALUES (609, 1154, 111, 1, 1200);
INSERT INTO aiwebshop.order_items VALUES (610, 1154, 108, 1, 1200);
INSERT INTO aiwebshop.order_items VALUES (652, 1202, 111, 1, 1200);
INSERT INTO aiwebshop.order_items VALUES (653, 1202, 108, 1, 1200);
INSERT INTO aiwebshop.order_items VALUES (702, 1252, 109, 1, 1200);
INSERT INTO aiwebshop.order_items VALUES (703, 1252, 111, 1, 1200);
INSERT INTO aiwebshop.order_items VALUES (704, 1252, 108, 1, 1200);


--
-- TOC entry 5048 (class 0 OID 16421)
-- Dependencies: 229
-- Data for Name: orders; Type: TABLE DATA; Schema: aiwebshop; Owner: postgres
--

INSERT INTO aiwebshop.orders VALUES (1152, 202, '2025-04-01 21:41:15.79', 21, 2, 1, 2);
INSERT INTO aiwebshop.orders VALUES (1153, 202, '2025-04-01 21:46:43.399', 21, 3, 1, 9);
INSERT INTO aiwebshop.orders VALUES (1154, 4, '2025-04-01 21:47:55.225', 17, 3, 1, 9);
INSERT INTO aiwebshop.orders VALUES (1202, 4, '2025-04-05 11:06:38.342', 17, 2, 1, 17);
INSERT INTO aiwebshop.orders VALUES (1252, 4, '2025-04-10 18:19:40.296', 17, 2, 1, 16);


--
-- TOC entry 5050 (class 0 OID 16427)
-- Dependencies: 231
-- Data for Name: payment_type; Type: TABLE DATA; Schema: aiwebshop; Owner: postgres
--

INSERT INTO aiwebshop.payment_type VALUES (1, 'Utánvét', 'Utánvételes fizetési lehetőség a futárnál');
INSERT INTO aiwebshop.payment_type VALUES (2, 'Átutalás', 'Előre átutalással, banki tranzakció');


--
-- TOC entry 5052 (class 0 OID 16433)
-- Dependencies: 233
-- Data for Name: products; Type: TABLE DATA; Schema: aiwebshop; Owner: postgres
--

INSERT INTO aiwebshop.products VALUES (114, 'Gyerek Pizsama', 'Puha, kényelmes pizsama, amelyben minden gyerek jól érzi magát.', 2200, 20, 2200, 2230);
INSERT INTO aiwebshop.products VALUES (123, 'Konyhai Kés', 'Minőségi konyhai kés, amely megkönnyíti a főzést.', 4200, 19, 4200, 4220);
INSERT INTO aiwebshop.products VALUES (107, 'XPro Laptop', 'Egy nagy teljesítményű laptop, amely professzionális munkákhoz is kiválóan alkalmas.', 1200, 10, 1200, 1220);
INSERT INTO aiwebshop.products VALUES (109, 'Sport Okosóra', 'Az aktív életmódhoz tervezett, kényelmes és praktikus okosóra.', 1200, 12, 1200, 1240);
INSERT INTO aiwebshop.products VALUES (111, 'Prime Mobiltelefon', 'Modern funkciókkal és nagy teljesítménnyel rendelkező okostelefon.', 1200, 7, 1200, 1210);
INSERT INTO aiwebshop.products VALUES (108, 'Ultra Tablet', 'Könnyű, mégis erős funkciókkal felszerelt tablet mindennapos használatra.', 1200, 5, 1200, 1230);
INSERT INTO aiwebshop.products VALUES (110, 'Pro Tartozékok', 'Magas minőségű tartozékok igazi tech-rajongóknak.', 1200, 20, 1200, 1250);
INSERT INTO aiwebshop.products VALUES (112, 'Férfi Pulóver', 'Stílusos és kényelmes pulóver, amely minden alkalomra tökéletes.', 2200, 25, 2200, 2210);
INSERT INTO aiwebshop.products VALUES (113, 'Elegáns Női Ruha', 'Divatos, elegáns ruha, amely kiemeli a nőiességet.', 2200, 18, 2200, 2220);
INSERT INTO aiwebshop.products VALUES (115, 'Háziállat Kabát', 'Meleg kabát, amely biztosítja kedvenced kényelmét hideg időben.', 2200, 10, 2200, 2240);
INSERT INTO aiwebshop.products VALUES (116, 'Divatos Sál', 'Puha és meleg sál, amely egyszerre kényelmes és stílusos.', 2200, 30, 2200, 2250);
INSERT INTO aiwebshop.products VALUES (117, 'Hidratáló Krém', 'Tápláló krém, amely egészségesen tartja bőrödet.', 3200, 12, 3200, 3210);
INSERT INTO aiwebshop.products VALUES (118, 'Hajápoló Sampon', 'Minden hajtípusra alkalmas revitalizáló sampon.', 3200, 18, 3200, 3220);
INSERT INTO aiwebshop.products VALUES (119, 'Sminkkészlet', 'Komplett sminkkészlet, amely minden alkalomra tökéletes választás.', 3200, 10, 3200, 3230);
INSERT INTO aiwebshop.products VALUES (120, 'C-vitamin Kapszula', 'Létfontosságú vitamin-kiegészítő az immunrendszer támogatására.', 3200, 25, 3200, 3240);
INSERT INTO aiwebshop.products VALUES (121, 'Relaxáló Arcmaszk', 'Kényeztető arcmaszk az ellazulás és frissesség érdekében.', 3200, 30, 3200, 3250);
INSERT INTO aiwebshop.products VALUES (122, 'Tisztítószer Spray', 'Hatékony tisztítószer, amely minden felületre biztonságos.', 4200, 8, 4200, 4210);
INSERT INTO aiwebshop.products VALUES (124, 'Dekorációs Lámpa', 'Stílusos lámpa, amely feldobja otthonod hangulatát.', 4200, 12, 4200, 4230);
INSERT INTO aiwebshop.products VALUES (125, 'Öntözőkanna', 'Praktikus öntözőkanna, amely megkönnyíti a kertészkedést.', 4200, 10, 4200, 4240);
INSERT INTO aiwebshop.products VALUES (126, 'Díszváza', 'Elegáns váza, amely otthonod tökéletes dísze lehet.', 4200, 15, 4200, 4250);
INSERT INTO aiwebshop.products VALUES (127, 'Sportlabda', 'Strapabíró labda különböző sportokhoz.', 5200, 10, 5200, 5210);
INSERT INTO aiwebshop.products VALUES (128, 'Állítható Súlyzók', 'Erősítő edzésekhez tervezett állítható súlyzók.', 5200, 14, 5200, 5220);
INSERT INTO aiwebshop.products VALUES (129, 'Kényelmes Hálózsák', 'Meleg és kényelmes hálózsák kempingezéshez.', 5200, 18, 5200, 5230);
INSERT INTO aiwebshop.products VALUES (130, 'Szórakoztató Társasjáték', 'Vidám társasjáték családi estékhez és baráti összejövetelekhez.', 5200, 25, 5200, 5240);
INSERT INTO aiwebshop.products VALUES (131, 'Keksz Nasihoz', 'Finom keksz, amely tökéletes választás egy kis nassoláshoz.', 6200, 30, 6200, 6210);
INSERT INTO aiwebshop.products VALUES (132, 'Friss Gyümölcslé', 'Frissítő ital a mindennapi feltöltődéshez.', 6200, 20, 6200, 6220);
INSERT INTO aiwebshop.products VALUES (133, 'Gourmet Csokoládé', 'Különleges csokoládé ajándékozáshoz vagy saját magad kényeztetésére.', 6200, 10, 6200, 6230);
INSERT INTO aiwebshop.products VALUES (134, 'Prémium Bor', 'Exkluzív bor, amely különleges alkalmakkor tökéletes választás.', 6200, 15, 6200, 6240);
INSERT INTO aiwebshop.products VALUES (135, 'Magával Ragadó Regény', 'Érzelmes és lebilincselő olvasmány irodalomkedvelőknek.', 7200, 12, 7200, 7210);
INSERT INTO aiwebshop.products VALUES (136, 'Tanulói Tankönyv', 'Átfogó tankönyv, amely segíti a tanulást és a felkészülést.', 7200, 18, 7200, 7220);
INSERT INTO aiwebshop.products VALUES (137, 'Irodai Tűzőgép', 'Megbízható eszköz, amely nélkülözhetetlen irodai munkákhoz.', 7200, 20, 7200, 7230);
INSERT INTO aiwebshop.products VALUES (138, 'Praktikus Naptár', 'Átlátható naptár a mindennapi időbeosztás megszervezéséhez.', 7200, 25, 7200, 7240);


--
-- TOC entry 5056 (class 0 OID 16445)
-- Dependencies: 237
-- Data for Name: reviews; Type: TABLE DATA; Schema: aiwebshop; Owner: postgres
--

INSERT INTO aiwebshop.reviews VALUES (27, 4, 114, 5, 'SZép');
INSERT INTO aiwebshop.reviews VALUES (28, 4, 123, 4, 'Tetszik');
INSERT INTO aiwebshop.reviews VALUES (29, 4, 111, 2, 'Nem a legjobb');


--
-- TOC entry 5058 (class 0 OID 16449)
-- Dependencies: 239
-- Data for Name: shipment_type; Type: TABLE DATA; Schema: aiwebshop; Owner: postgres
--

INSERT INTO aiwebshop.shipment_type VALUES (1, 'Csomagpont', 'Átvétel egy kiválasztott csomagponton', 690);
INSERT INTO aiwebshop.shipment_type VALUES (2, 'Átvétel üzletben', 'Átvétel egy kiválasztott üzletben', 0);
INSERT INTO aiwebshop.shipment_type VALUES (3, 'Házhozszállítás (expressz)', 'A csomag egyenes házhozszállítása', 2190);
INSERT INTO aiwebshop.shipment_type VALUES (4, 'Házhozszállítás', 'A csomag egyenes házhozszállítása', 1490);


--
-- TOC entry 5066 (class 0 OID 41050)
-- Dependencies: 249
-- Data for Name: states; Type: TABLE DATA; Schema: aiwebshop; Owner: postgres
--

INSERT INTO aiwebshop.states VALUES (1, 'Bács-Kiskun');
INSERT INTO aiwebshop.states VALUES (2, 'Baranya');
INSERT INTO aiwebshop.states VALUES (3, 'Békés');
INSERT INTO aiwebshop.states VALUES (4, 'Borsod-Abaúj-Zemplén');
INSERT INTO aiwebshop.states VALUES (5, 'Csongrád-Csanád');
INSERT INTO aiwebshop.states VALUES (6, 'Fejér');
INSERT INTO aiwebshop.states VALUES (7, 'Győr-Moson-Sopron');
INSERT INTO aiwebshop.states VALUES (8, 'Hajdú-Bihar');
INSERT INTO aiwebshop.states VALUES (9, 'Heves');
INSERT INTO aiwebshop.states VALUES (10, 'Jász-Nagykun-Szolnok');
INSERT INTO aiwebshop.states VALUES (11, 'Komárom-Esztergom');
INSERT INTO aiwebshop.states VALUES (12, 'Nógrád');
INSERT INTO aiwebshop.states VALUES (13, 'Pest');
INSERT INTO aiwebshop.states VALUES (14, 'Somogy');
INSERT INTO aiwebshop.states VALUES (15, 'Szabolcs-Szatmár-Bereg');
INSERT INTO aiwebshop.states VALUES (16, 'Tolna');
INSERT INTO aiwebshop.states VALUES (17, 'Vas');
INSERT INTO aiwebshop.states VALUES (18, 'Veszprém');
INSERT INTO aiwebshop.states VALUES (19, 'Zala');


--
-- TOC entry 5054 (class 0 OID 16439)
-- Dependencies: 235
-- Data for Name: sub_category; Type: TABLE DATA; Schema: aiwebshop; Owner: postgres
--

INSERT INTO aiwebshop.sub_category VALUES (1220, 'Laptop', 1200);
INSERT INTO aiwebshop.sub_category VALUES (1230, 'Tablet', 1200);
INSERT INTO aiwebshop.sub_category VALUES (1240, 'Okosóra', 1200);
INSERT INTO aiwebshop.sub_category VALUES (1250, 'Tartozék', 1200);
INSERT INTO aiwebshop.sub_category VALUES (1210, 'Mobiltelefon', 1200);
INSERT INTO aiwebshop.sub_category VALUES (2210, 'Ferfi ruházat', 2200);
INSERT INTO aiwebshop.sub_category VALUES (2220, 'Női ruházat', 2200);
INSERT INTO aiwebshop.sub_category VALUES (2230, 'Gyerek ruházat', 2200);
INSERT INTO aiwebshop.sub_category VALUES (2240, 'Kisállat ruházat', 2200);
INSERT INTO aiwebshop.sub_category VALUES (2250, 'Kiegészítők', 2200);
INSERT INTO aiwebshop.sub_category VALUES (3210, 'Bőrápolás', 3200);
INSERT INTO aiwebshop.sub_category VALUES (3220, 'Hajápolás', 3200);
INSERT INTO aiwebshop.sub_category VALUES (3230, 'Smink', 3200);
INSERT INTO aiwebshop.sub_category VALUES (3240, 'Vitaminok', 3200);
INSERT INTO aiwebshop.sub_category VALUES (3250, 'Egyéb kiegészítők', 3200);
INSERT INTO aiwebshop.sub_category VALUES (4210, 'Tisztítószerek', 4200);
INSERT INTO aiwebshop.sub_category VALUES (4220, 'Konyhai eszközök', 4200);
INSERT INTO aiwebshop.sub_category VALUES (4230, 'Lakberendezési tárgyak', 4200);
INSERT INTO aiwebshop.sub_category VALUES (4240, 'Kerti eszközök', 4200);
INSERT INTO aiwebshop.sub_category VALUES (4250, 'Dekoráció', 4200);
INSERT INTO aiwebshop.sub_category VALUES (5210, 'Sportfelszerelés', 5200);
INSERT INTO aiwebshop.sub_category VALUES (5220, 'Fitness eszközök', 5200);
INSERT INTO aiwebshop.sub_category VALUES (5230, 'Outdoor felszerelések', 5200);
INSERT INTO aiwebshop.sub_category VALUES (5240, 'Hobbi és Játékok', 5200);
INSERT INTO aiwebshop.sub_category VALUES (6210, 'Élelmiszer', 6200);
INSERT INTO aiwebshop.sub_category VALUES (6220, 'Ital', 6200);
INSERT INTO aiwebshop.sub_category VALUES (6230, 'Különlegességek és ajándékcsomagok', 6200);
INSERT INTO aiwebshop.sub_category VALUES (6240, 'Alkohol', 6200);
INSERT INTO aiwebshop.sub_category VALUES (7210, 'Szépirodalom', 7200);
INSERT INTO aiwebshop.sub_category VALUES (7220, 'Szakirodalom', 7200);
INSERT INTO aiwebshop.sub_category VALUES (7230, 'Irodaszerek', 7200);
INSERT INTO aiwebshop.sub_category VALUES (7240, 'Jegyzetfüzet és naptár', 7200);


--
-- TOC entry 5060 (class 0 OID 16455)
-- Dependencies: 241
-- Data for Name: users; Type: TABLE DATA; Schema: aiwebshop; Owner: postgres
--

INSERT INTO aiwebshop.users VALUES (102, 'asd', 'asd', 'erdelyi.patrik99@gmail.com', '$2a$10$AsapZ0nSwKTS2ll7In3co.l5Iz5QwJfAycaQvmM4fqkMDlVyRe1cC', 'asd', 'asd3231', false, false);
INSERT INTO aiwebshop.users VALUES (4, 'admin', 'admin', 'erdelyi.patrik99@gmail.com', '$2a$10$rg0iEkayH5v5yvYj/Rm/oeWXo8.d5nOlUSJPIHPZ2RBQVrOPkRfeu', '123456789', 'admin', true, false);
INSERT INTO aiwebshop.users VALUES (202, 'teszt', 'teszt', 'teszt@teszt.hu', '$2a$10$s49KrDRhCiTkf2Q1qEZns.T0WY.U8va44UlsIilM5YB/j2HMR9n4a', 'teszt', 'teszt', false, false);


--
-- TOC entry 5090 (class 0 OID 0)
-- Dependencies: 218
-- Name: addresses_address_id_seq; Type: SEQUENCE SET; Schema: aiwebshop; Owner: postgres
--

SELECT pg_catalog.setval('aiwebshop.addresses_address_id_seq', 21, true);


--
-- TOC entry 5091 (class 0 OID 0)
-- Dependencies: 220
-- Name: cart_cart_id_seq; Type: SEQUENCE SET; Schema: aiwebshop; Owner: postgres
--

SELECT pg_catalog.setval('aiwebshop.cart_cart_id_seq', 112, true);


--
-- TOC entry 5092 (class 0 OID 0)
-- Dependencies: 222
-- Name: categories_category_id_seq; Type: SEQUENCE SET; Schema: aiwebshop; Owner: postgres
--

SELECT pg_catalog.setval('aiwebshop.categories_category_id_seq', 10, true);


--
-- TOC entry 5093 (class 0 OID 0)
-- Dependencies: 224
-- Name: chat_messages_chat_id_seq; Type: SEQUENCE SET; Schema: aiwebshop; Owner: postgres
--

SELECT pg_catalog.setval('aiwebshop.chat_messages_chat_id_seq', 1, false);


--
-- TOC entry 5094 (class 0 OID 0)
-- Dependencies: 225
-- Name: chat_messages_seq; Type: SEQUENCE SET; Schema: aiwebshop; Owner: postgres
--

SELECT pg_catalog.setval('aiwebshop.chat_messages_seq', 2901, true);


--
-- TOC entry 5095 (class 0 OID 0)
-- Dependencies: 226
-- Name: chat_seq; Type: SEQUENCE SET; Schema: aiwebshop; Owner: postgres
--

SELECT pg_catalog.setval('aiwebshop.chat_seq', 1, false);


--
-- TOC entry 5096 (class 0 OID 0)
-- Dependencies: 228
-- Name: order_items_item_id_seq; Type: SEQUENCE SET; Schema: aiwebshop; Owner: postgres
--

SELECT pg_catalog.setval('aiwebshop.order_items_item_id_seq', 1, false);


--
-- TOC entry 5097 (class 0 OID 0)
-- Dependencies: 253
-- Name: order_items_seq; Type: SEQUENCE SET; Schema: aiwebshop; Owner: postgres
--

SELECT pg_catalog.setval('aiwebshop.order_items_seq', 751, true);


--
-- TOC entry 5098 (class 0 OID 0)
-- Dependencies: 255
-- Name: order_items_with_user_data_seq; Type: SEQUENCE SET; Schema: aiwebshop; Owner: postgres
--

SELECT pg_catalog.setval('aiwebshop.order_items_with_user_data_seq', 1, false);


--
-- TOC entry 5099 (class 0 OID 0)
-- Dependencies: 230
-- Name: orders_order_id_seq; Type: SEQUENCE SET; Schema: aiwebshop; Owner: postgres
--

SELECT pg_catalog.setval('aiwebshop.orders_order_id_seq', 1, false);


--
-- TOC entry 5100 (class 0 OID 0)
-- Dependencies: 252
-- Name: orders_seq; Type: SEQUENCE SET; Schema: aiwebshop; Owner: postgres
--

SELECT pg_catalog.setval('aiwebshop.orders_seq', 1301, true);


--
-- TOC entry 5101 (class 0 OID 0)
-- Dependencies: 232
-- Name: payment_type_payment_type_id_seq; Type: SEQUENCE SET; Schema: aiwebshop; Owner: postgres
--

SELECT pg_catalog.setval('aiwebshop.payment_type_payment_type_id_seq', 5, true);


--
-- TOC entry 5102 (class 0 OID 0)
-- Dependencies: 244
-- Name: payment_type_seq; Type: SEQUENCE SET; Schema: aiwebshop; Owner: postgres
--

SELECT pg_catalog.setval('aiwebshop.payment_type_seq', 1, false);


--
-- TOC entry 5103 (class 0 OID 0)
-- Dependencies: 234
-- Name: products_product_id_seq; Type: SEQUENCE SET; Schema: aiwebshop; Owner: postgres
--

SELECT pg_catalog.setval('aiwebshop.products_product_id_seq', 138, true);


--
-- TOC entry 5104 (class 0 OID 0)
-- Dependencies: 236
-- Name: products_sub_category_product_sub_category_id_seq; Type: SEQUENCE SET; Schema: aiwebshop; Owner: postgres
--

SELECT pg_catalog.setval('aiwebshop.products_sub_category_product_sub_category_id_seq', 38, true);


--
-- TOC entry 5105 (class 0 OID 0)
-- Dependencies: 238
-- Name: reviews_review_id_seq; Type: SEQUENCE SET; Schema: aiwebshop; Owner: postgres
--

SELECT pg_catalog.setval('aiwebshop.reviews_review_id_seq', 29, true);


--
-- TOC entry 5106 (class 0 OID 0)
-- Dependencies: 248
-- Name: shipment_type_seq; Type: SEQUENCE SET; Schema: aiwebshop; Owner: postgres
--

SELECT pg_catalog.setval('aiwebshop.shipment_type_seq', 1, false);


--
-- TOC entry 5107 (class 0 OID 0)
-- Dependencies: 240
-- Name: shipment_type_shipment_type_id_seq; Type: SEQUENCE SET; Schema: aiwebshop; Owner: postgres
--

SELECT pg_catalog.setval('aiwebshop.shipment_type_shipment_type_id_seq', 4, true);


--
-- TOC entry 5108 (class 0 OID 0)
-- Dependencies: 251
-- Name: states_seq; Type: SEQUENCE SET; Schema: aiwebshop; Owner: postgres
--

SELECT pg_catalog.setval('aiwebshop.states_seq', 1, false);


--
-- TOC entry 5109 (class 0 OID 0)
-- Dependencies: 250
-- Name: states_state_id_seq; Type: SEQUENCE SET; Schema: aiwebshop; Owner: postgres
--

SELECT pg_catalog.setval('aiwebshop.states_state_id_seq', 19, true);


--
-- TOC entry 5110 (class 0 OID 0)
-- Dependencies: 245
-- Name: sub_category_seq; Type: SEQUENCE SET; Schema: aiwebshop; Owner: postgres
--

SELECT pg_catalog.setval('aiwebshop.sub_category_seq', 1, false);


--
-- TOC entry 5111 (class 0 OID 0)
-- Dependencies: 242
-- Name: users_seq; Type: SEQUENCE SET; Schema: aiwebshop; Owner: postgres
--

SELECT pg_catalog.setval('aiwebshop.users_seq', 251, true);


--
-- TOC entry 5112 (class 0 OID 0)
-- Dependencies: 243
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: aiwebshop; Owner: postgres
--

SELECT pg_catalog.setval('aiwebshop.users_user_id_seq', 38, true);


--
-- TOC entry 4843 (class 2606 OID 16475)
-- Name: addresses addresses_pk; Type: CONSTRAINT; Schema: aiwebshop; Owner: postgres
--

ALTER TABLE ONLY aiwebshop.addresses
    ADD CONSTRAINT addresses_pk PRIMARY KEY (address_id);


--
-- TOC entry 4845 (class 2606 OID 16477)
-- Name: cart cart_pk; Type: CONSTRAINT; Schema: aiwebshop; Owner: postgres
--

ALTER TABLE ONLY aiwebshop.cart
    ADD CONSTRAINT cart_pk PRIMARY KEY (cart_id);


--
-- TOC entry 4847 (class 2606 OID 16479)
-- Name: categories categories_pk; Type: CONSTRAINT; Schema: aiwebshop; Owner: postgres
--

ALTER TABLE ONLY aiwebshop.categories
    ADD CONSTRAINT categories_pk PRIMARY KEY (category_id);


--
-- TOC entry 4849 (class 2606 OID 16481)
-- Name: chat_messages chat_messages_pk; Type: CONSTRAINT; Schema: aiwebshop; Owner: postgres
--

ALTER TABLE ONLY aiwebshop.chat_messages
    ADD CONSTRAINT chat_messages_pk PRIMARY KEY (chat_id);


--
-- TOC entry 4851 (class 2606 OID 16483)
-- Name: order_items order_items_pk; Type: CONSTRAINT; Schema: aiwebshop; Owner: postgres
--

ALTER TABLE ONLY aiwebshop.order_items
    ADD CONSTRAINT order_items_pk PRIMARY KEY (item_id);


--
-- TOC entry 4853 (class 2606 OID 16485)
-- Name: orders orders_pk; Type: CONSTRAINT; Schema: aiwebshop; Owner: postgres
--

ALTER TABLE ONLY aiwebshop.orders
    ADD CONSTRAINT orders_pk PRIMARY KEY (order_id);


--
-- TOC entry 4855 (class 2606 OID 24594)
-- Name: payment_type payment_type_pk; Type: CONSTRAINT; Schema: aiwebshop; Owner: postgres
--

ALTER TABLE ONLY aiwebshop.payment_type
    ADD CONSTRAINT payment_type_pk PRIMARY KEY (payment_type_id);


--
-- TOC entry 4857 (class 2606 OID 16489)
-- Name: products products_pk; Type: CONSTRAINT; Schema: aiwebshop; Owner: postgres
--

ALTER TABLE ONLY aiwebshop.products
    ADD CONSTRAINT products_pk PRIMARY KEY (product_id);


--
-- TOC entry 4859 (class 2606 OID 16491)
-- Name: sub_category products_sub_category_pk; Type: CONSTRAINT; Schema: aiwebshop; Owner: postgres
--

ALTER TABLE ONLY aiwebshop.sub_category
    ADD CONSTRAINT products_sub_category_pk PRIMARY KEY (sub_category_id);


--
-- TOC entry 4861 (class 2606 OID 16493)
-- Name: reviews reviews_pk; Type: CONSTRAINT; Schema: aiwebshop; Owner: postgres
--

ALTER TABLE ONLY aiwebshop.reviews
    ADD CONSTRAINT reviews_pk PRIMARY KEY (review_id);


--
-- TOC entry 4863 (class 2606 OID 16495)
-- Name: shipment_type shipment_type_pk; Type: CONSTRAINT; Schema: aiwebshop; Owner: postgres
--

ALTER TABLE ONLY aiwebshop.shipment_type
    ADD CONSTRAINT shipment_type_pk PRIMARY KEY (shipment_type_id);


--
-- TOC entry 4869 (class 2606 OID 41059)
-- Name: states states_pk; Type: CONSTRAINT; Schema: aiwebshop; Owner: postgres
--

ALTER TABLE ONLY aiwebshop.states
    ADD CONSTRAINT states_pk PRIMARY KEY (state_id);


--
-- TOC entry 4865 (class 2606 OID 16497)
-- Name: users uniqe_username; Type: CONSTRAINT; Schema: aiwebshop; Owner: postgres
--

ALTER TABLE ONLY aiwebshop.users
    ADD CONSTRAINT uniqe_username UNIQUE (username);


--
-- TOC entry 4867 (class 2606 OID 16499)
-- Name: users users_pk; Type: CONSTRAINT; Schema: aiwebshop; Owner: postgres
--

ALTER TABLE ONLY aiwebshop.users
    ADD CONSTRAINT users_pk PRIMARY KEY (user_id);


--
-- TOC entry 4886 (class 2620 OID 16500)
-- Name: products check_product_category; Type: TRIGGER; Schema: aiwebshop; Owner: postgres
--

CREATE TRIGGER check_product_category BEFORE INSERT OR UPDATE ON aiwebshop.products FOR EACH ROW EXECUTE FUNCTION aiwebshop.check_product_category_function();


--
-- TOC entry 4870 (class 2606 OID 41006)
-- Name: addresses addresses_users_fk; Type: FK CONSTRAINT; Schema: aiwebshop; Owner: postgres
--

ALTER TABLE ONLY aiwebshop.addresses
    ADD CONSTRAINT addresses_users_fk FOREIGN KEY (user_id) REFERENCES aiwebshop.users(user_id) ON DELETE CASCADE;


--
-- TOC entry 4871 (class 2606 OID 16506)
-- Name: cart cart_products_fk; Type: FK CONSTRAINT; Schema: aiwebshop; Owner: postgres
--

ALTER TABLE ONLY aiwebshop.cart
    ADD CONSTRAINT cart_products_fk FOREIGN KEY (product_id) REFERENCES aiwebshop.products(product_id);


--
-- TOC entry 4872 (class 2606 OID 16511)
-- Name: cart cart_users_fk; Type: FK CONSTRAINT; Schema: aiwebshop; Owner: postgres
--

ALTER TABLE ONLY aiwebshop.cart
    ADD CONSTRAINT cart_users_fk FOREIGN KEY (user_id) REFERENCES aiwebshop.users(user_id);


--
-- TOC entry 4873 (class 2606 OID 41001)
-- Name: chat_messages chat_messages_users_fk; Type: FK CONSTRAINT; Schema: aiwebshop; Owner: postgres
--

ALTER TABLE ONLY aiwebshop.chat_messages
    ADD CONSTRAINT chat_messages_users_fk FOREIGN KEY (user_id) REFERENCES aiwebshop.users(user_id) ON DELETE CASCADE;


--
-- TOC entry 4874 (class 2606 OID 16521)
-- Name: order_items order_items_orders_fk; Type: FK CONSTRAINT; Schema: aiwebshop; Owner: postgres
--

ALTER TABLE ONLY aiwebshop.order_items
    ADD CONSTRAINT order_items_orders_fk FOREIGN KEY (order_id) REFERENCES aiwebshop.orders(order_id);


--
-- TOC entry 4875 (class 2606 OID 16526)
-- Name: order_items order_items_products_fk; Type: FK CONSTRAINT; Schema: aiwebshop; Owner: postgres
--

ALTER TABLE ONLY aiwebshop.order_items
    ADD CONSTRAINT order_items_products_fk FOREIGN KEY (product_id) REFERENCES aiwebshop.products(product_id);


--
-- TOC entry 4876 (class 2606 OID 16531)
-- Name: orders orders_addresses_fk; Type: FK CONSTRAINT; Schema: aiwebshop; Owner: postgres
--

ALTER TABLE ONLY aiwebshop.orders
    ADD CONSTRAINT orders_addresses_fk FOREIGN KEY (address_id) REFERENCES aiwebshop.addresses(address_id);


--
-- TOC entry 4877 (class 2606 OID 24595)
-- Name: orders orders_payment_type_fk; Type: FK CONSTRAINT; Schema: aiwebshop; Owner: postgres
--

ALTER TABLE ONLY aiwebshop.orders
    ADD CONSTRAINT orders_payment_type_fk FOREIGN KEY (payment_type_id) REFERENCES aiwebshop.payment_type(payment_type_id);


--
-- TOC entry 4878 (class 2606 OID 16541)
-- Name: orders orders_shipment_type_fk; Type: FK CONSTRAINT; Schema: aiwebshop; Owner: postgres
--

ALTER TABLE ONLY aiwebshop.orders
    ADD CONSTRAINT orders_shipment_type_fk FOREIGN KEY (shipping_type_id) REFERENCES aiwebshop.shipment_type(shipment_type_id);


--
-- TOC entry 4879 (class 2606 OID 41068)
-- Name: orders orders_states_fk; Type: FK CONSTRAINT; Schema: aiwebshop; Owner: postgres
--

ALTER TABLE ONLY aiwebshop.orders
    ADD CONSTRAINT orders_states_fk FOREIGN KEY (state_id) REFERENCES aiwebshop.states(state_id);


--
-- TOC entry 4880 (class 2606 OID 16546)
-- Name: orders orders_users_fk; Type: FK CONSTRAINT; Schema: aiwebshop; Owner: postgres
--

ALTER TABLE ONLY aiwebshop.orders
    ADD CONSTRAINT orders_users_fk FOREIGN KEY (user_id) REFERENCES aiwebshop.users(user_id);


--
-- TOC entry 4881 (class 2606 OID 16551)
-- Name: products products_categories_fk; Type: FK CONSTRAINT; Schema: aiwebshop; Owner: postgres
--

ALTER TABLE ONLY aiwebshop.products
    ADD CONSTRAINT products_categories_fk FOREIGN KEY (category_id) REFERENCES aiwebshop.categories(category_id);


--
-- TOC entry 4883 (class 2606 OID 16556)
-- Name: sub_category products_sub_category_categories_fk; Type: FK CONSTRAINT; Schema: aiwebshop; Owner: postgres
--

ALTER TABLE ONLY aiwebshop.sub_category
    ADD CONSTRAINT products_sub_category_categories_fk FOREIGN KEY (category_id) REFERENCES aiwebshop.categories(category_id);


--
-- TOC entry 4882 (class 2606 OID 16561)
-- Name: products products_sub_category_fk; Type: FK CONSTRAINT; Schema: aiwebshop; Owner: postgres
--

ALTER TABLE ONLY aiwebshop.products
    ADD CONSTRAINT products_sub_category_fk FOREIGN KEY (sub_category_id) REFERENCES aiwebshop.sub_category(sub_category_id);


--
-- TOC entry 4884 (class 2606 OID 40976)
-- Name: reviews reviews_products_fk; Type: FK CONSTRAINT; Schema: aiwebshop; Owner: postgres
--

ALTER TABLE ONLY aiwebshop.reviews
    ADD CONSTRAINT reviews_products_fk FOREIGN KEY (product_id) REFERENCES aiwebshop.products(product_id) ON DELETE CASCADE;


--
-- TOC entry 4885 (class 2606 OID 16571)
-- Name: reviews reviews_users_fk; Type: FK CONSTRAINT; Schema: aiwebshop; Owner: postgres
--

ALTER TABLE ONLY aiwebshop.reviews
    ADD CONSTRAINT reviews_users_fk FOREIGN KEY (user_id) REFERENCES aiwebshop.users(user_id);


-- Completed on 2025-04-14 13:02:56

--
-- PostgreSQL database dump complete
--

