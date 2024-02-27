import { generateAuthToken } from "aws-msk-iam-sasl-signer-js";
import { Kafka } from "kafkajs";
import { brokers, region } from "./config";

const oauthBearerTokenProvider = async (region: string) => {
	const authTokenResponse = await generateAuthToken({ region });
	return {
		value: authTokenResponse.token,
	};
};

const kafka = new Kafka({
	clientId: "msk-producer-consumer",
	brokers,
	ssl: true,
	sasl: {
		mechanism: "oauthbearer",
		oauthBearerProvider: () => oauthBearerTokenProvider(region),
	},
});

export default kafka;
