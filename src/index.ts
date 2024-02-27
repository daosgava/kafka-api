import { Hono } from "hono";
import consumer from "./consumer";
import producer from "./producer";

const app = new Hono();

app.get("/", (ctx) => {
	return ctx.text("Kafka API!");
});

app.get("/consumer", (ctx) => {
	consumer().catch(console.error);
	return ctx.text("Check your terminal!");
});

app.get("/producer/:message", async (ctx) => {
	const message = ctx.req.param("message");
	await producer(message);
	return ctx.text("Message sent!");
});

export default app;
