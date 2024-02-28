import kafka from "./kafkaInstance";
import { topic } from "./config";

const consumer = async () => {
	const consumer = kafka.consumer({ groupId: "bun-group" });
	await consumer.connect();
	await consumer.subscribe({ topic, fromBeginning: true});

	await consumer.run({
		eachMessage: async ({ topic, partition, message }) => {
			const prefix = `${topic}[${partition} | ${message.offset}] / ${message.timestamp}`;
			console.log("*** Printing Message ***");
			console.log(`- ${prefix} ${message.key}#${message.value}`);
		},
	});
};

export default consumer;;
