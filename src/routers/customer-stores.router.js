import express from "express";
import { prisma } from "../utils/prisma.util.js";
import { StoresRepository } from "../repositories/stores.repository.js";
import { OrdersRepository } from "../repositories/orders.respository.js";
import { MenusRepository } from "../repositories/menus.repository.js";
import { MenusService } from "../services/menus.service.js";
import { MenusController } from "../controllers/menus.controller.js";
import { CustomerStoresService } from "../services/customer-stores.service.js";
import { CustomerStoresController } from "../controllers/customer-stores.controller.js";

const customerStoresRouter = express.Router();

const storesRepository = new StoresRepository(prisma);
const ordersRepository = new OrdersRepository(prisma);
const menusRepository = new MenusRepository(prisma);
const menusService = new MenusService(menusRepository);
const menusController = new MenusController(menusService);
const customerStoresService = new CustomerStoresService(
  ordersRepository,
  storesRepository,
  menusRepository,
);
const customerStoresController = new CustomerStoresController(
  customerStoresService,
);

// 고객 가게 정보 조회 : 기능 추가해야됨!!!
customerStoresRouter.get("/:store_id", customerStoresController.getStoreInfo);
// 메뉴 목록 조회
customerStoresRouter.get("/:store_id/menus", menusController.getMenus);
// 주문하기
customerStoresRouter.post(
  "/:store_id/orders",
  customerStoresController.createOrder,
);
// 메뉴 상세 조회
customerStoresRouter.get("/:store_id/:menu_id", menusController.getMenuDetail);

export { customerStoresRouter };
