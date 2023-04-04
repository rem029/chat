--
-- PostgreSQL database dump
--

-- Dumped from database version 15.2
-- Dumped by pg_dump version 15.2

-- Started on 2023-04-05 02:24:06

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
-- TOC entry 6 (class 2615 OID 17153)
-- Name: common; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA common;


ALTER SCHEMA common OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 215 (class 1259 OID 17154)
-- Name: messages; Type: TABLE; Schema: common; Owner: postgres
--

CREATE TABLE common.messages (
    id integer NOT NULL,
    room_id integer NOT NULL,
    user_id integer NOT NULL,
    message text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE common.messages OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 17161)
-- Name: messages_id_seq; Type: SEQUENCE; Schema: common; Owner: postgres
--

ALTER TABLE common.messages ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME common.messages_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 218 (class 1259 OID 17177)
-- Name: users; Type: TABLE; Schema: common; Owner: postgres
--

CREATE TABLE common.users (
    id integer NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE common.users OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 17176)
-- Name: users_id_seq; Type: SEQUENCE; Schema: common; Owner: postgres
--

ALTER TABLE common.users ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME common.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 3331 (class 0 OID 17154)
-- Dependencies: 215
-- Data for Name: messages; Type: TABLE DATA; Schema: common; Owner: postgres
--

COPY common.messages (id, room_id, user_id, message, created_at, updated_at) FROM stdin;
3	1	1	Test message34	2023-04-05 01:24:43.432013+03	2023-04-05 01:24:43.432013+03
4	1	1	Test message34	2023-04-05 01:25:06.451291+03	2023-04-05 01:25:06.451291+03
5	1	1	Test message34	2023-04-05 01:26:42.32786+03	2023-04-05 01:26:42.32786+03
6	1	1	Test message34	2023-04-05 01:26:59.609852+03	2023-04-05 01:26:59.609852+03
7	1	1	Test message34	2023-04-05 01:27:13.669327+03	2023-04-05 01:27:13.669327+03
8	1	1	Test message34	2023-04-05 01:27:54.958829+03	2023-04-05 01:27:54.958829+03
2	1	1	Test message update	2023-04-05 01:24:23.763228+03	2023-04-05 01:27:54.958829+03
1	1	1	message update from node	2023-04-05 01:24:04.803541+03	2023-04-05 02:14:03.175042+03
9	1	2	message from node	2023-04-05 02:14:18.568233+03	2023-04-05 02:14:18.568233+03
10	1	2	message from node	2023-04-05 02:15:21.399744+03	2023-04-05 02:15:21.399744+03
11	1	2	message from node	2023-04-05 02:16:23.900648+03	2023-04-05 02:16:23.900648+03
12	1	2	message from node	2023-04-05 02:17:19.392988+03	2023-04-05 02:17:19.392988+03
13	1	2	message from node	2023-04-05 02:18:39.638408+03	2023-04-05 02:18:39.638408+03
14	1	2	message from node	2023-04-05 02:18:58.120697+03	2023-04-05 02:18:58.120697+03
\.


--
-- TOC entry 3334 (class 0 OID 17177)
-- Dependencies: 218
-- Data for Name: users; Type: TABLE DATA; Schema: common; Owner: postgres
--

COPY common.users (id, email, password, created_at, updated_at) FROM stdin;
1	test@gmail.com	123	2023-04-05 02:06:36.908929+03	2023-04-05 02:06:36.908929+03
2	test123@gmail.com	123	2023-04-05 02:06:36.908929+03	2023-04-05 02:06:36.908929+03
3	test1234@gmail.com	123	2023-04-05 02:06:36.908929+03	2023-04-05 02:06:36.908929+03
\.


--
-- TOC entry 3340 (class 0 OID 0)
-- Dependencies: 216
-- Name: messages_id_seq; Type: SEQUENCE SET; Schema: common; Owner: postgres
--

SELECT pg_catalog.setval('common.messages_id_seq', 14, true);


--
-- TOC entry 3341 (class 0 OID 0)
-- Dependencies: 217
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: common; Owner: postgres
--

SELECT pg_catalog.setval('common.users_id_seq', 3, true);


--
-- TOC entry 3184 (class 2606 OID 17160)
-- Name: messages messages_pkey; Type: CONSTRAINT; Schema: common; Owner: postgres
--

ALTER TABLE ONLY common.messages
    ADD CONSTRAINT messages_pkey PRIMARY KEY (id);


--
-- TOC entry 3186 (class 2606 OID 17187)
-- Name: users users_email_key; Type: CONSTRAINT; Schema: common; Owner: postgres
--

ALTER TABLE ONLY common.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- TOC entry 3188 (class 2606 OID 17185)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: common; Owner: postgres
--

ALTER TABLE ONLY common.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


-- Completed on 2023-04-05 02:24:06

--
-- PostgreSQL database dump complete
--

