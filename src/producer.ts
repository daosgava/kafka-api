import kafka from "./kafkaInstance";
import { topic } from "./config";

const producer = async (message: string) => {
	const producer = kafka.producer();
	await producer.connect();
	await producer.send({
		topic,
		messages: [{ value: message }],
	});
	await producer.disconnect();
};

export default producer;
