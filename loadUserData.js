import { MongoClient } from "mongodb";
import assert from "assert";
import config from "./config";

MongoClient.connect(config.mongodbUri, (err, client) => {
    assert.equal(null, err);

    client
        .db("test")
        .collection("users")
        .insertMany([
            {
                userId: 0,
                userName: "chrishouse83",
                realName: "Chris House",
                likesReceived: 1267,
                currentWinningEntries: 2,
                likesGiven: 5506,
                contestsEntered: 79,
                numContestsFollowing: 122,
                contestsFollowing: [1, 3, 4],
                currentWinners: 8
            },
            {
                userId: 1,
                userName: "theDonald",
                realName: "Donald Trump",
                likesReceived: 564,
                currentWinningEntries: 12,
                likesGiven: 1506,
                contestsEntered: 120,
                numContestsFollowing: 8,
                contestsFollowing: [4],
                currentWinners: 0
            },
            {
                userId: 2,
                userName: "johnny69",
                realName: "John Gates",
                likesReceived: 3478,
                currentWinningEntries: 234,
                likesGiven: 99,
                contestsEntered: 178,
                numContestsFollowing: 2345,
                contestsFollowing: [1, 5],
                currentWinners: 12
            }
        ])
        .then(response => {
            console.info("Users", response.insertedCount);
            client.close();
        });
});