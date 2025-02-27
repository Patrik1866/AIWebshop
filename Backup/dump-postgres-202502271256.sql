--
-- PostgreSQL database dump
--

-- Dumped from database version 17.2
-- Dumped by pg_dump version 17.0

-- Started on 2025-02-27 12:56:31

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
-- TOC entry 247 (class 1255 OID 16390)
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
-- TOC entry 5044 (class 0 OID 0)
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
-- TOC entry 5045 (class 0 OID 0)
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
    price integer,
    quantity integer,
    category_id integer,
    sub_category_id integer
);


ALTER TABLE aiwebshop.products OWNER TO postgres;

--
-- TOC entry 246 (class 1259 OID 40972)
-- Name: cart_view; Type: VIEW; Schema: aiwebshop; Owner: postgres
--

CREATE VIEW aiwebshop.cart_view AS
 SELECT c.cart_id,
    c.user_id,
    p.product_id,
    p.name AS product_name,
    p.description AS product_description,
    p.price AS product_price,
    c.quantity AS product_quantity
   FROM (aiwebshop.cart c
     JOIN aiwebshop.products p ON ((c.product_id = p.product_id)));


ALTER VIEW aiwebshop.cart_view OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 16401)
-- Name: categories; Type: TABLE; Schema: aiwebshop; Owner: postgres
--

CREATE TABLE aiwebshop.categories (
    category_id integer NOT NULL,
    name character varying
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
-- TOC entry 5046 (class 0 OID 0)
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
-- TOC entry 5047 (class 0 OID 0)
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
    price numeric
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
-- TOC entry 5048 (class 0 OID 0)
-- Dependencies: 228
-- Name: order_items_item_id_seq; Type: SEQUENCE OWNED BY; Schema: aiwebshop; Owner: postgres
--

ALTER SEQUENCE aiwebshop.order_items_item_id_seq OWNED BY aiwebshop.order_items.item_id;


--
-- TOC entry 229 (class 1259 OID 16421)
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
-- TOC entry 5049 (class 0 OID 0)
-- Dependencies: 230
-- Name: orders_order_id_seq; Type: SEQUENCE OWNED BY; Schema: aiwebshop; Owner: postgres
--

ALTER SEQUENCE aiwebshop.orders_order_id_seq OWNED BY aiwebshop.orders.order_id;


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
-- TOC entry 5050 (class 0 OID 0)
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
-- TOC entry 5051 (class 0 OID 0)
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
    name character varying,
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
-- TOC entry 5052 (class 0 OID 0)
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
-- TOC entry 5053 (class 0 OID 0)
-- Dependencies: 238
-- Name: reviews_review_id_seq; Type: SEQUENCE OWNED BY; Schema: aiwebshop; Owner: postgres
--

ALTER SEQUENCE aiwebshop.reviews_review_id_seq OWNED BY aiwebshop.reviews.review_id;


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
-- TOC entry 245 (class 1259 OID 32772)
-- Name: reviews_with_username; Type: VIEW; Schema: aiwebshop; Owner: postgres
--

CREATE VIEW aiwebshop.reviews_with_username AS
 SELECT r.review_id,
    r.user_id,
    r.product_id,
    r.point,
    r.description,
    u.username
   FROM (aiwebshop.reviews r
     JOIN aiwebshop.users u ON ((r.user_id = u.user_id)));


ALTER VIEW aiwebshop.reviews_with_username OWNER TO postgres;

--
-- TOC entry 239 (class 1259 OID 16449)
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
-- TOC entry 5054 (class 0 OID 0)
-- Dependencies: 240
-- Name: shipment_type_shipment_type_id_seq; Type: SEQUENCE OWNED BY; Schema: aiwebshop; Owner: postgres
--

ALTER SEQUENCE aiwebshop.shipment_type_shipment_type_id_seq OWNED BY aiwebshop.shipment_type.shipment_type_id;


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
-- TOC entry 5055 (class 0 OID 0)
-- Dependencies: 243
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: aiwebshop; Owner: postgres
--

ALTER SEQUENCE aiwebshop.users_user_id_seq OWNED BY aiwebshop.users.user_id;


--
-- TOC entry 4810 (class 2604 OID 16462)
-- Name: addresses address_id; Type: DEFAULT; Schema: aiwebshop; Owner: postgres
--

ALTER TABLE ONLY aiwebshop.addresses ALTER COLUMN address_id SET DEFAULT nextval('aiwebshop.addresses_address_id_seq'::regclass);


--
-- TOC entry 4811 (class 2604 OID 16463)
-- Name: cart cart_id; Type: DEFAULT; Schema: aiwebshop; Owner: postgres
--

ALTER TABLE ONLY aiwebshop.cart ALTER COLUMN cart_id SET DEFAULT nextval('aiwebshop.cart_cart_id_seq'::regclass);


--
-- TOC entry 4812 (class 2604 OID 16464)
-- Name: categories category_id; Type: DEFAULT; Schema: aiwebshop; Owner: postgres
--

ALTER TABLE ONLY aiwebshop.categories ALTER COLUMN category_id SET DEFAULT nextval('aiwebshop.categories_category_id_seq'::regclass);


--
-- TOC entry 4813 (class 2604 OID 16465)
-- Name: chat_messages chat_id; Type: DEFAULT; Schema: aiwebshop; Owner: postgres
--

ALTER TABLE ONLY aiwebshop.chat_messages ALTER COLUMN chat_id SET DEFAULT nextval('aiwebshop.chat_messages_chat_id_seq'::regclass);


--
-- TOC entry 4814 (class 2604 OID 16466)
-- Name: order_items item_id; Type: DEFAULT; Schema: aiwebshop; Owner: postgres
--

ALTER TABLE ONLY aiwebshop.order_items ALTER COLUMN item_id SET DEFAULT nextval('aiwebshop.order_items_item_id_seq'::regclass);


--
-- TOC entry 4815 (class 2604 OID 16467)
-- Name: orders order_id; Type: DEFAULT; Schema: aiwebshop; Owner: postgres
--

ALTER TABLE ONLY aiwebshop.orders ALTER COLUMN order_id SET DEFAULT nextval('aiwebshop.orders_order_id_seq'::regclass);


--
-- TOC entry 4816 (class 2604 OID 16468)
-- Name: payment_type payment_type_id; Type: DEFAULT; Schema: aiwebshop; Owner: postgres
--

ALTER TABLE ONLY aiwebshop.payment_type ALTER COLUMN payment_type_id SET DEFAULT nextval('aiwebshop.payment_type_payment_type_id_seq'::regclass);


--
-- TOC entry 4817 (class 2604 OID 16469)
-- Name: products product_id; Type: DEFAULT; Schema: aiwebshop; Owner: postgres
--

ALTER TABLE ONLY aiwebshop.products ALTER COLUMN product_id SET DEFAULT nextval('aiwebshop.products_product_id_seq'::regclass);


--
-- TOC entry 4819 (class 2604 OID 16470)
-- Name: reviews review_id; Type: DEFAULT; Schema: aiwebshop; Owner: postgres
--

ALTER TABLE ONLY aiwebshop.reviews ALTER COLUMN review_id SET DEFAULT nextval('aiwebshop.reviews_review_id_seq'::regclass);


--
-- TOC entry 4820 (class 2604 OID 16471)
-- Name: shipment_type shipment_type_id; Type: DEFAULT; Schema: aiwebshop; Owner: postgres
--

ALTER TABLE ONLY aiwebshop.shipment_type ALTER COLUMN shipment_type_id SET DEFAULT nextval('aiwebshop.shipment_type_shipment_type_id_seq'::regclass);


--
-- TOC entry 4818 (class 2604 OID 16472)
-- Name: sub_category sub_category_id; Type: DEFAULT; Schema: aiwebshop; Owner: postgres
--

ALTER TABLE ONLY aiwebshop.sub_category ALTER COLUMN sub_category_id SET DEFAULT nextval('aiwebshop.products_sub_category_product_sub_category_id_seq'::regclass);


--
-- TOC entry 4821 (class 2604 OID 16473)
-- Name: users user_id; Type: DEFAULT; Schema: aiwebshop; Owner: postgres
--

ALTER TABLE ONLY aiwebshop.users ALTER COLUMN user_id SET DEFAULT nextval('aiwebshop.users_user_id_seq'::regclass);


--
-- TOC entry 5011 (class 0 OID 16391)
-- Dependencies: 217
-- Data for Name: addresses; Type: TABLE DATA; Schema: aiwebshop; Owner: postgres
--

INSERT INTO aiwebshop.addresses VALUES (17, 4, 'teszt', 'teszt', '12', '123');


--
-- TOC entry 5013 (class 0 OID 16397)
-- Dependencies: 219
-- Data for Name: cart; Type: TABLE DATA; Schema: aiwebshop; Owner: postgres
--

INSERT INTO aiwebshop.cart VALUES (1, 4, 32, 0);
INSERT INTO aiwebshop.cart VALUES (2, 4, 32, 5);
INSERT INTO aiwebshop.cart VALUES (3, 4, 32, 5);
INSERT INTO aiwebshop.cart VALUES (4, 4, 32, 13);


--
-- TOC entry 5015 (class 0 OID 16401)
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
-- TOC entry 5017 (class 0 OID 16407)
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
INSERT INTO aiwebshop.chat_messages VALUES (354, 4, 'Jól vagyok, köszönöm. Önnel mi újság?', 'Szia hogy vagy?');
INSERT INTO aiwebshop.chat_messages VALUES (355, 52, 'Köszönöm szépen, jól vagyok. És te hogy vagy ma?', 'Szia hogy vagy?');
INSERT INTO aiwebshop.chat_messages VALUES (356, 52, 'Én egy nyelvmodell vagyok, amelyet a Google képzett.', 'Segítesz nekem?');
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


--
-- TOC entry 5021 (class 0 OID 16415)
-- Dependencies: 227
-- Data for Name: order_items; Type: TABLE DATA; Schema: aiwebshop; Owner: postgres
--



--
-- TOC entry 5023 (class 0 OID 16421)
-- Dependencies: 229
-- Data for Name: orders; Type: TABLE DATA; Schema: aiwebshop; Owner: postgres
--



--
-- TOC entry 5025 (class 0 OID 16427)
-- Dependencies: 231
-- Data for Name: payment_type; Type: TABLE DATA; Schema: aiwebshop; Owner: postgres
--

INSERT INTO aiwebshop.payment_type VALUES (1, 'Utánvét', 'Utánvételes fizetési lehetőség a futárnál');
INSERT INTO aiwebshop.payment_type VALUES (2, 'Átutalás', 'Előre átutalással, banki tranzakció');


--
-- TOC entry 5027 (class 0 OID 16433)
-- Dependencies: 233
-- Data for Name: products; Type: TABLE DATA; Schema: aiwebshop; Owner: postgres
--

INSERT INTO aiwebshop.products VALUES (32, 'asd', 'asd', 1000, 10, 1200, 1220);
INSERT INTO aiwebshop.products VALUES (34, 'teszt', 'teszt', 100, 1, 1200, 1210);
INSERT INTO aiwebshop.products VALUES (35, 'telóasdasd', 'teló', 1000, 10, 1200, 1210);
INSERT INTO aiwebshop.products VALUES (36, 'asdasdasdadas', 'gg', 1200, 2, 1200, 1210);


--
-- TOC entry 5031 (class 0 OID 16445)
-- Dependencies: 237
-- Data for Name: reviews; Type: TABLE DATA; Schema: aiwebshop; Owner: postgres
--

INSERT INTO aiwebshop.reviews VALUES (1, 4, 32, 0, 'Elég jó');
INSERT INTO aiwebshop.reviews VALUES (2, 4, 32, 5, 'Elég jó');
INSERT INTO aiwebshop.reviews VALUES (3, 4, 32, 5, 'test');
INSERT INTO aiwebshop.reviews VALUES (4, 4, 32, 5, 'test');
INSERT INTO aiwebshop.reviews VALUES (5, 4, 32, 5, 'test');
INSERT INTO aiwebshop.reviews VALUES (6, 4, 32, 5, '');
INSERT INTO aiwebshop.reviews VALUES (7, 4, 32, 4, 'Tetszik he');
INSERT INTO aiwebshop.reviews VALUES (8, 4, 35, 5, 'test');
INSERT INTO aiwebshop.reviews VALUES (9, 4, 35, 3, 'Az komisz');
INSERT INTO aiwebshop.reviews VALUES (10, 4, 34, 1, 'Nemá');
INSERT INTO aiwebshop.reviews VALUES (11, 4, 32, 1, 'teszt');


--
-- TOC entry 5033 (class 0 OID 16449)
-- Dependencies: 239
-- Data for Name: shipment_type; Type: TABLE DATA; Schema: aiwebshop; Owner: postgres
--



--
-- TOC entry 5029 (class 0 OID 16439)
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
-- TOC entry 5035 (class 0 OID 16455)
-- Dependencies: 241
-- Data for Name: users; Type: TABLE DATA; Schema: aiwebshop; Owner: postgres
--

INSERT INTO aiwebshop.users VALUES (2, 'teszt', 'teszt', 'teszt@teszt.hu', '$2a$10$ND/9oA7VAcAIKNJRn/Vcge7ZyMVZxrz9064cyjK5UhWkkXSmgW08.', '123456789', 'teszt', false, true);
INSERT INTO aiwebshop.users VALUES (52, 'user', 'user', 'teszt@teszt.hu', '$2a$10$/Q.qARq1mh2fA4MQBSDSMeyjNris6.xJ4mNyRodw/yE1nVDmbDVvK', '123456789', 'user', false, false);
INSERT INTO aiwebshop.users VALUES (102, 'asd', 'asd', 'asd@asd.hu', '$2a$10$AsapZ0nSwKTS2ll7In3co.l5Iz5QwJfAycaQvmM4fqkMDlVyRe1cC', 'asd', 'asd', false, false);
INSERT INTO aiwebshop.users VALUES (4, 'admin', 'admin', 'teszt@teszt.hu', '$2a$10$rg0iEkayH5v5yvYj/Rm/oeWXo8.d5nOlUSJPIHPZ2RBQVrOPkRfeu', '123456789', 'admin', true, false);


--
-- TOC entry 5056 (class 0 OID 0)
-- Dependencies: 218
-- Name: addresses_address_id_seq; Type: SEQUENCE SET; Schema: aiwebshop; Owner: postgres
--

SELECT pg_catalog.setval('aiwebshop.addresses_address_id_seq', 17, true);


--
-- TOC entry 5057 (class 0 OID 0)
-- Dependencies: 220
-- Name: cart_cart_id_seq; Type: SEQUENCE SET; Schema: aiwebshop; Owner: postgres
--

SELECT pg_catalog.setval('aiwebshop.cart_cart_id_seq', 4, true);


--
-- TOC entry 5058 (class 0 OID 0)
-- Dependencies: 222
-- Name: categories_category_id_seq; Type: SEQUENCE SET; Schema: aiwebshop; Owner: postgres
--

SELECT pg_catalog.setval('aiwebshop.categories_category_id_seq', 10, true);


--
-- TOC entry 5059 (class 0 OID 0)
-- Dependencies: 224
-- Name: chat_messages_chat_id_seq; Type: SEQUENCE SET; Schema: aiwebshop; Owner: postgres
--

SELECT pg_catalog.setval('aiwebshop.chat_messages_chat_id_seq', 1, false);


--
-- TOC entry 5060 (class 0 OID 0)
-- Dependencies: 225
-- Name: chat_messages_seq; Type: SEQUENCE SET; Schema: aiwebshop; Owner: postgres
--

SELECT pg_catalog.setval('aiwebshop.chat_messages_seq', 451, true);


--
-- TOC entry 5061 (class 0 OID 0)
-- Dependencies: 226
-- Name: chat_seq; Type: SEQUENCE SET; Schema: aiwebshop; Owner: postgres
--

SELECT pg_catalog.setval('aiwebshop.chat_seq', 1, false);


--
-- TOC entry 5062 (class 0 OID 0)
-- Dependencies: 228
-- Name: order_items_item_id_seq; Type: SEQUENCE SET; Schema: aiwebshop; Owner: postgres
--

SELECT pg_catalog.setval('aiwebshop.order_items_item_id_seq', 1, false);


--
-- TOC entry 5063 (class 0 OID 0)
-- Dependencies: 230
-- Name: orders_order_id_seq; Type: SEQUENCE SET; Schema: aiwebshop; Owner: postgres
--

SELECT pg_catalog.setval('aiwebshop.orders_order_id_seq', 1, false);


--
-- TOC entry 5064 (class 0 OID 0)
-- Dependencies: 232
-- Name: payment_type_payment_type_id_seq; Type: SEQUENCE SET; Schema: aiwebshop; Owner: postgres
--

SELECT pg_catalog.setval('aiwebshop.payment_type_payment_type_id_seq', 5, true);


--
-- TOC entry 5065 (class 0 OID 0)
-- Dependencies: 244
-- Name: payment_type_seq; Type: SEQUENCE SET; Schema: aiwebshop; Owner: postgres
--

SELECT pg_catalog.setval('aiwebshop.payment_type_seq', 1, false);


--
-- TOC entry 5066 (class 0 OID 0)
-- Dependencies: 234
-- Name: products_product_id_seq; Type: SEQUENCE SET; Schema: aiwebshop; Owner: postgres
--

SELECT pg_catalog.setval('aiwebshop.products_product_id_seq', 36, true);


--
-- TOC entry 5067 (class 0 OID 0)
-- Dependencies: 236
-- Name: products_sub_category_product_sub_category_id_seq; Type: SEQUENCE SET; Schema: aiwebshop; Owner: postgres
--

SELECT pg_catalog.setval('aiwebshop.products_sub_category_product_sub_category_id_seq', 38, true);


--
-- TOC entry 5068 (class 0 OID 0)
-- Dependencies: 238
-- Name: reviews_review_id_seq; Type: SEQUENCE SET; Schema: aiwebshop; Owner: postgres
--

SELECT pg_catalog.setval('aiwebshop.reviews_review_id_seq', 11, true);


--
-- TOC entry 5069 (class 0 OID 0)
-- Dependencies: 240
-- Name: shipment_type_shipment_type_id_seq; Type: SEQUENCE SET; Schema: aiwebshop; Owner: postgres
--

SELECT pg_catalog.setval('aiwebshop.shipment_type_shipment_type_id_seq', 1, false);


--
-- TOC entry 5070 (class 0 OID 0)
-- Dependencies: 242
-- Name: users_seq; Type: SEQUENCE SET; Schema: aiwebshop; Owner: postgres
--

SELECT pg_catalog.setval('aiwebshop.users_seq', 151, true);


--
-- TOC entry 5071 (class 0 OID 0)
-- Dependencies: 243
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: aiwebshop; Owner: postgres
--

SELECT pg_catalog.setval('aiwebshop.users_user_id_seq', 38, true);


--
-- TOC entry 4823 (class 2606 OID 16475)
-- Name: addresses addresses_pk; Type: CONSTRAINT; Schema: aiwebshop; Owner: postgres
--

ALTER TABLE ONLY aiwebshop.addresses
    ADD CONSTRAINT addresses_pk PRIMARY KEY (address_id);


--
-- TOC entry 4825 (class 2606 OID 16477)
-- Name: cart cart_pk; Type: CONSTRAINT; Schema: aiwebshop; Owner: postgres
--

ALTER TABLE ONLY aiwebshop.cart
    ADD CONSTRAINT cart_pk PRIMARY KEY (cart_id);


--
-- TOC entry 4827 (class 2606 OID 16479)
-- Name: categories categories_pk; Type: CONSTRAINT; Schema: aiwebshop; Owner: postgres
--

ALTER TABLE ONLY aiwebshop.categories
    ADD CONSTRAINT categories_pk PRIMARY KEY (category_id);


--
-- TOC entry 4829 (class 2606 OID 16481)
-- Name: chat_messages chat_messages_pk; Type: CONSTRAINT; Schema: aiwebshop; Owner: postgres
--

ALTER TABLE ONLY aiwebshop.chat_messages
    ADD CONSTRAINT chat_messages_pk PRIMARY KEY (chat_id);


--
-- TOC entry 4831 (class 2606 OID 16483)
-- Name: order_items order_items_pk; Type: CONSTRAINT; Schema: aiwebshop; Owner: postgres
--

ALTER TABLE ONLY aiwebshop.order_items
    ADD CONSTRAINT order_items_pk PRIMARY KEY (item_id);


--
-- TOC entry 4833 (class 2606 OID 16485)
-- Name: orders orders_pk; Type: CONSTRAINT; Schema: aiwebshop; Owner: postgres
--

ALTER TABLE ONLY aiwebshop.orders
    ADD CONSTRAINT orders_pk PRIMARY KEY (order_id);


--
-- TOC entry 4835 (class 2606 OID 24594)
-- Name: payment_type payment_type_pk; Type: CONSTRAINT; Schema: aiwebshop; Owner: postgres
--

ALTER TABLE ONLY aiwebshop.payment_type
    ADD CONSTRAINT payment_type_pk PRIMARY KEY (payment_type_id);


--
-- TOC entry 4837 (class 2606 OID 16489)
-- Name: products products_pk; Type: CONSTRAINT; Schema: aiwebshop; Owner: postgres
--

ALTER TABLE ONLY aiwebshop.products
    ADD CONSTRAINT products_pk PRIMARY KEY (product_id);


--
-- TOC entry 4839 (class 2606 OID 16491)
-- Name: sub_category products_sub_category_pk; Type: CONSTRAINT; Schema: aiwebshop; Owner: postgres
--

ALTER TABLE ONLY aiwebshop.sub_category
    ADD CONSTRAINT products_sub_category_pk PRIMARY KEY (sub_category_id);


--
-- TOC entry 4841 (class 2606 OID 16493)
-- Name: reviews reviews_pk; Type: CONSTRAINT; Schema: aiwebshop; Owner: postgres
--

ALTER TABLE ONLY aiwebshop.reviews
    ADD CONSTRAINT reviews_pk PRIMARY KEY (review_id);


--
-- TOC entry 4843 (class 2606 OID 16495)
-- Name: shipment_type shipment_type_pk; Type: CONSTRAINT; Schema: aiwebshop; Owner: postgres
--

ALTER TABLE ONLY aiwebshop.shipment_type
    ADD CONSTRAINT shipment_type_pk PRIMARY KEY (shipment_type_id);


--
-- TOC entry 4845 (class 2606 OID 16497)
-- Name: users uniqe_username; Type: CONSTRAINT; Schema: aiwebshop; Owner: postgres
--

ALTER TABLE ONLY aiwebshop.users
    ADD CONSTRAINT uniqe_username UNIQUE (username);


--
-- TOC entry 4847 (class 2606 OID 16499)
-- Name: users users_pk; Type: CONSTRAINT; Schema: aiwebshop; Owner: postgres
--

ALTER TABLE ONLY aiwebshop.users
    ADD CONSTRAINT users_pk PRIMARY KEY (user_id);


--
-- TOC entry 4863 (class 2620 OID 16500)
-- Name: products check_product_category; Type: TRIGGER; Schema: aiwebshop; Owner: postgres
--

CREATE TRIGGER check_product_category BEFORE INSERT OR UPDATE ON aiwebshop.products FOR EACH ROW EXECUTE FUNCTION aiwebshop.check_product_category_function();


--
-- TOC entry 4848 (class 2606 OID 16501)
-- Name: addresses addresses_users_fk; Type: FK CONSTRAINT; Schema: aiwebshop; Owner: postgres
--

ALTER TABLE ONLY aiwebshop.addresses
    ADD CONSTRAINT addresses_users_fk FOREIGN KEY (user_id) REFERENCES aiwebshop.users(user_id);


--
-- TOC entry 4849 (class 2606 OID 16506)
-- Name: cart cart_products_fk; Type: FK CONSTRAINT; Schema: aiwebshop; Owner: postgres
--

ALTER TABLE ONLY aiwebshop.cart
    ADD CONSTRAINT cart_products_fk FOREIGN KEY (product_id) REFERENCES aiwebshop.products(product_id);


--
-- TOC entry 4850 (class 2606 OID 16511)
-- Name: cart cart_users_fk; Type: FK CONSTRAINT; Schema: aiwebshop; Owner: postgres
--

ALTER TABLE ONLY aiwebshop.cart
    ADD CONSTRAINT cart_users_fk FOREIGN KEY (user_id) REFERENCES aiwebshop.users(user_id);


--
-- TOC entry 4851 (class 2606 OID 16516)
-- Name: chat_messages chat_messages_users_fk; Type: FK CONSTRAINT; Schema: aiwebshop; Owner: postgres
--

ALTER TABLE ONLY aiwebshop.chat_messages
    ADD CONSTRAINT chat_messages_users_fk FOREIGN KEY (user_id) REFERENCES aiwebshop.users(user_id);


--
-- TOC entry 4852 (class 2606 OID 16521)
-- Name: order_items order_items_orders_fk; Type: FK CONSTRAINT; Schema: aiwebshop; Owner: postgres
--

ALTER TABLE ONLY aiwebshop.order_items
    ADD CONSTRAINT order_items_orders_fk FOREIGN KEY (order_id) REFERENCES aiwebshop.orders(order_id);


--
-- TOC entry 4853 (class 2606 OID 16526)
-- Name: order_items order_items_products_fk; Type: FK CONSTRAINT; Schema: aiwebshop; Owner: postgres
--

ALTER TABLE ONLY aiwebshop.order_items
    ADD CONSTRAINT order_items_products_fk FOREIGN KEY (product_id) REFERENCES aiwebshop.products(product_id);


--
-- TOC entry 4854 (class 2606 OID 16531)
-- Name: orders orders_addresses_fk; Type: FK CONSTRAINT; Schema: aiwebshop; Owner: postgres
--

ALTER TABLE ONLY aiwebshop.orders
    ADD CONSTRAINT orders_addresses_fk FOREIGN KEY (address_id) REFERENCES aiwebshop.addresses(address_id);


--
-- TOC entry 4855 (class 2606 OID 24595)
-- Name: orders orders_payment_type_fk; Type: FK CONSTRAINT; Schema: aiwebshop; Owner: postgres
--

ALTER TABLE ONLY aiwebshop.orders
    ADD CONSTRAINT orders_payment_type_fk FOREIGN KEY (payment_type_id) REFERENCES aiwebshop.payment_type(payment_type_id);


--
-- TOC entry 4856 (class 2606 OID 16541)
-- Name: orders orders_shipment_type_fk; Type: FK CONSTRAINT; Schema: aiwebshop; Owner: postgres
--

ALTER TABLE ONLY aiwebshop.orders
    ADD CONSTRAINT orders_shipment_type_fk FOREIGN KEY (shipping_type_id) REFERENCES aiwebshop.shipment_type(shipment_type_id);


--
-- TOC entry 4857 (class 2606 OID 16546)
-- Name: orders orders_users_fk; Type: FK CONSTRAINT; Schema: aiwebshop; Owner: postgres
--

ALTER TABLE ONLY aiwebshop.orders
    ADD CONSTRAINT orders_users_fk FOREIGN KEY (user_id) REFERENCES aiwebshop.users(user_id);


--
-- TOC entry 4858 (class 2606 OID 16551)
-- Name: products products_categories_fk; Type: FK CONSTRAINT; Schema: aiwebshop; Owner: postgres
--

ALTER TABLE ONLY aiwebshop.products
    ADD CONSTRAINT products_categories_fk FOREIGN KEY (category_id) REFERENCES aiwebshop.categories(category_id);


--
-- TOC entry 4860 (class 2606 OID 16556)
-- Name: sub_category products_sub_category_categories_fk; Type: FK CONSTRAINT; Schema: aiwebshop; Owner: postgres
--

ALTER TABLE ONLY aiwebshop.sub_category
    ADD CONSTRAINT products_sub_category_categories_fk FOREIGN KEY (category_id) REFERENCES aiwebshop.categories(category_id);


--
-- TOC entry 4859 (class 2606 OID 16561)
-- Name: products products_sub_category_fk; Type: FK CONSTRAINT; Schema: aiwebshop; Owner: postgres
--

ALTER TABLE ONLY aiwebshop.products
    ADD CONSTRAINT products_sub_category_fk FOREIGN KEY (sub_category_id) REFERENCES aiwebshop.sub_category(sub_category_id);


--
-- TOC entry 4861 (class 2606 OID 16566)
-- Name: reviews reviews_products_fk; Type: FK CONSTRAINT; Schema: aiwebshop; Owner: postgres
--

ALTER TABLE ONLY aiwebshop.reviews
    ADD CONSTRAINT reviews_products_fk FOREIGN KEY (product_id) REFERENCES aiwebshop.products(product_id);


--
-- TOC entry 4862 (class 2606 OID 16571)
-- Name: reviews reviews_users_fk; Type: FK CONSTRAINT; Schema: aiwebshop; Owner: postgres
--

ALTER TABLE ONLY aiwebshop.reviews
    ADD CONSTRAINT reviews_users_fk FOREIGN KEY (user_id) REFERENCES aiwebshop.users(user_id);


-- Completed on 2025-02-27 12:56:31

--
-- PostgreSQL database dump complete
--

