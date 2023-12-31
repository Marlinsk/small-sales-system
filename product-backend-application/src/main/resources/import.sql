INSERT INTO CATEGORY (ID, DESCRIPTION) VALUES (1001, 'Hardware');

INSERT INTO SUPPLIER (ID, NAME) VALUES (1001, 'Intel');
INSERT INTO SUPPLIER (ID, NAME) VALUES (1002, 'AMD');
INSERT INTO SUPPLIER (ID, NAME) VALUES (1003, 'NVIDIA');
INSERT INTO SUPPLIER (ID, NAME) VALUES (1004, 'ASUS');
INSERT INTO SUPPLIER (ID, NAME) VALUES (1005, 'GigaByte');
INSERT INTO SUPPLIER (ID, NAME) VALUES (1006, 'Galax');
INSERT INTO SUPPLIER (ID, NAME) VALUES (1007, 'Corsair');
INSERT INTO SUPPLIER (ID, NAME) VALUES (1008, 'Kingston');
INSERT INTO SUPPLIER (ID, NAME) VALUES (1009, 'Kingston Fury Renegade');
INSERT INTO SUPPLIER (ID, NAME) VALUES (1010, 'Seagate');
INSERT INTO SUPPLIER (ID, NAME) VALUES (1011, 'Samsung');

INSERT INTO PRODUCT (ID, NAME, FK_SUPPLIER, FK_CATEGORY, QUANTITY_AVAILABLE, CREATED_AT, UPDATED_AT) VALUES (1001, 'Processador Intel Core i7-10700KF, 10ª Geração, 3.8GHz (5.1GHz Max Turbo), Cache 16MB, LGA 1200 - BX8070110700KF', 1001, 1001, 5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO PRODUCT (ID, NAME, FK_SUPPLIER, FK_CATEGORY, QUANTITY_AVAILABLE, CREATED_AT, UPDATED_AT) VALUES (1002, 'Processador Intel Core i9-11900K, 11ª Geração, 3.5 GHz (5.1GHz Turbo), Cache 16MB, Octa Core, LGA1200, Vídeo Integrado - BX8070811900K', 1001, 1001, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO PRODUCT (ID, NAME, FK_SUPPLIER, FK_CATEGORY, QUANTITY_AVAILABLE, CREATED_AT, UPDATED_AT) VALUES (1003, 'Processador Intel Core i9-12900F, 12ª Geração, Cache 30MB, 2.4GHz (5.1GHz Max Turbo), LGA 1700 - BX8071512900F', 1001, 1001, 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO PRODUCT (ID, NAME, FK_SUPPLIER, FK_CATEGORY, QUANTITY_AVAILABLE, CREATED_AT, UPDATED_AT) VALUES (1004, 'Processador Intel Core i9-13900K, 13ª Geração, 5.8GHz Max Turbo, Cache 36MB, 24 Núcleos, LGA 1700, Vídeo Integrado - BX8071513900K', 1001, 1001, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO PRODUCT (ID, NAME, FK_SUPPLIER, FK_CATEGORY, QUANTITY_AVAILABLE, CREATED_AT, UPDATED_AT) VALUES (1005, 'Processador AMD Ryzen 5 5600X, 3.7GHz (4.6GHz Max Turbo), Cache 35MB, 6 Núcleos, 12 Threads, AM4 - 100-100000065BOX', 1002, 1001, 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO PRODUCT (ID, NAME, FK_SUPPLIER, FK_CATEGORY, QUANTITY_AVAILABLE, CREATED_AT, UPDATED_AT) VALUES (1006, 'Processador AMD Ryzen 9 7900X, 5.6GHz, Cache 76MB, AM5, Radeon Graphics Com Ví­deo - 100-100000589WOF', 1002, 1001, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO PRODUCT (ID, NAME, FK_SUPPLIER, FK_CATEGORY, QUANTITY_AVAILABLE, CREATED_AT, UPDATED_AT) VALUES (1007, 'Placa de Vídeo RTX 4060 EAGLE OC Gigabyte NVIDIA GeForce, 8GB GDRR6, DLSS, Ray Tracing - GV-N4060EAGLE OC-8GD', 1005, 1001, 6, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO PRODUCT (ID, NAME, FK_SUPPLIER, FK_CATEGORY, QUANTITY_AVAILABLE, CREATED_AT, UPDATED_AT) VALUES (1008, 'Placa de Vídeo RTX 4060 1-Click OC 1X Galax NVIDIA GeForce, 8GB GDDR6, DLSS, Ray Trancing, G-Sync', 1006, 1001, 6, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO PRODUCT (ID, NAME, FK_SUPPLIER, FK_CATEGORY, QUANTITY_AVAILABLE, CREATED_AT, UPDATED_AT) VALUES (1009, 'Placa de Vídeo RTX 4060 OC Edition Dual ASUS NVIDIA GeForce, 8GB GDDR6, DLSS, Ray Tracing - DUAL-RTX4060-O8G', 1004, 1001, 8, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO PRODUCT (ID, NAME, FK_SUPPLIER, FK_CATEGORY, QUANTITY_AVAILABLE, CREATED_AT, UPDATED_AT) VALUES (1010, 'Placa De Vídeo Gigabyte NVIDIA GeForce GTX 1650 D6 OC 4G, 4GB GDDR6, REV 4.0 - GV-N1656OC-4GD 4.0', 1005, 1001, 7, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO PRODUCT (ID, NAME, FK_SUPPLIER, FK_CATEGORY, QUANTITY_AVAILABLE, CREATED_AT, UPDATED_AT) VALUES (1011, 'Placa Mãe Gigabyte B660M Aorus PRO, Intel LGA 1700, mATX, DDR4, M.2 NVME', 1005, 1001, 7, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO PRODUCT (ID, NAME, FK_SUPPLIER, FK_CATEGORY, QUANTITY_AVAILABLE, CREATED_AT, UPDATED_AT) VALUES (1012, 'Placa-Mãe Asus TUF Gaming X670E-Plus, AMD X670, AM5, ATX, DDR5 - 90MB1BJ0-M0EAY0', 1004, 1001, 5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO PRODUCT (ID, NAME, FK_SUPPLIER, FK_CATEGORY, QUANTITY_AVAILABLE, CREATED_AT, UPDATED_AT) VALUES (1013, 'Placa-Mãe Asus TUF G Z690-PLUS D4, Intel 12ª Geração - 90MB18U0-C1BAY0', 1004, 1001, 5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO PRODUCT (ID, NAME, FK_SUPPLIER, FK_CATEGORY, QUANTITY_AVAILABLE, CREATED_AT, UPDATED_AT) VALUES (1014, 'Placa Mãe Asus ROG Strix B550-F Gaming II, AMD AM4, ATX, DDR4, Wi-Fi, Aura Sync RGB', 1004, 1001, 5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO PRODUCT (ID, NAME, FK_SUPPLIER, FK_CATEGORY, QUANTITY_AVAILABLE, CREATED_AT, UPDATED_AT) VALUES (1015, 'Cooler Fan Corsair LL140 Single, 140mm, RGB, Preto - CO-9050073', 1007, 1001, 10, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO PRODUCT (ID, NAME, FK_SUPPLIER, FK_CATEGORY, QUANTITY_AVAILABLE, CREATED_AT, UPDATED_AT) VALUES (1016, 'SSD 1 TB Kingston NV2, M.2 2280 PCIe, NVMe, Leitura: 3500 MB/s e Gravação: 2100 MB/s - SNV2S/1000G', 1008, 1001, 6, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO PRODUCT (ID, NAME, FK_SUPPLIER, FK_CATEGORY, QUANTITY_AVAILABLE, CREATED_AT, UPDATED_AT) VALUES (1017, 'SSD Kingston Fury Renegade 4TB, M.2 2280 PCIe, NVMe, Leituras 7.300MB/s, Gravação 7.000MB/s - SFYRD/4000G', 1009, 1001, 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO PRODUCT (ID, NAME, FK_SUPPLIER, FK_CATEGORY, QUANTITY_AVAILABLE, CREATED_AT, UPDATED_AT) VALUES (1018, 'HD Externo Seagate Expansion 16TB, USB, Preto - STKP16000400', 1010, 1001, 8, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO PRODUCT (ID, NAME, FK_SUPPLIER, FK_CATEGORY, QUANTITY_AVAILABLE, CREATED_AT, UPDATED_AT) VALUES (1019, 'HD Seagate 1TB Seagate SkyHawk, Cachê 64MB, 3.5, SATA, 6.0GB/s, IMP - ST1000VX005', 1010, 1001, 10, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO PRODUCT (ID, NAME, FK_SUPPLIER, FK_CATEGORY, QUANTITY_AVAILABLE, CREATED_AT, UPDATED_AT) VALUES (1020, 'HD Seagate IronWolf NAS, 8TB, SATA - ST8000VN004', 1010, 1001, 7, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO PRODUCT (ID, NAME, FK_SUPPLIER, FK_CATEGORY, QUANTITY_AVAILABLE, CREATED_AT, UPDATED_AT) VALUES (1021, 'Monitor Gamer Samsung Odyssey G5 34 Polegadas VA, Curvo, Wide, 165 Hz, 2K QHD, 1ms, FreeSync Premium, HDR10, HDMI/DisplayPort - LC34G55TWWLXZD', 1011, 1001, 8, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO PRODUCT (ID, NAME, FK_SUPPLIER, FK_CATEGORY, QUANTITY_AVAILABLE, CREATED_AT, UPDATED_AT) VALUES (1022, 'Monitor Gamer Samsung Odyssey G6 Curvo 27 Polegadas LED 2K QHD, 240 Hz, 1ms, HDMI e DisplayPort, HDR, FreeSync Premium - LS27BG650ELXZD', 1011, 1001, 12, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO PRODUCT (ID, NAME, FK_SUPPLIER, FK_CATEGORY, QUANTITY_AVAILABLE, CREATED_AT, UPDATED_AT) VALUES (1023, 'Monitor Gamer Samsung Odyssey G32 27 Polegadas LED Full HD, 165 Hz, 1ms, HDMI/DisplayPort, FreeSync Premium, Ajuste de Altura, Preto - LS27AG320NLXZD', 1011, 1001, 12, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

