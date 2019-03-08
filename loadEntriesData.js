import { MongoClient } from "mongodb";
import assert from "assert";
import config from "./config";

MongoClient.connect(config.mongodbUri, (err, client) => {
    assert.equal(null, err);

    client
        .db("test")
        .collection("entries")
        .insertMany([
            {
                contestId: "5c7ecfd5469be00dbe18c5f9",
                text:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                likes: 1527,
                user: "5c7ecf9eb8a7020d42fb850a",
                date: "2019-02-03T13:37:27.000Z"
            },
            {
                contestId: "5c7ecfd5469be00dbe18c5f9",
                text:
                    "Nunc tincidunt nunc nec ligula suscipit, a dignissim lectus ornare. Aenean bibendum magna libero.",
                likes: 87,
                user: "5c7ecf9eb8a7020d42fb850b",
                date: "2019-02-01T13:37:27.000Z"
            },
            {
                contestId: "5c7ecfd5469be00dbe18c5f9",
                text:
                    "Suspendisse lacinia ultricies nunc id ornare. Etiam orci risus, vestibulum ut congue vitae, ornare id orci. Etiam ultrices cursus mauris, vel lacinia elit. ",
                likes: 88,
                user: "5c7ecf9eb8a7020d42fb850c",
                date: "2019-02-11T13:37:27.000Z"
            },
            {
                contestId: "5c7ecfd5469be00dbe18c5f9",
                text:
                    "Donec feugiat venenatis lectus vitae eleifend. Proin vel ligula mauris.",
                likes: 1527,
                user: "5c7ecf9eb8a7020d42fb850b",
                date: "2019-03-13T13:37:27.000Z"
            },
            {
                contestId: "5c7ecfd5469be00dbe18c5f9",
                text:
                    "Aenean consequat velit sit amet pharetra consectetur. Integer fermentum nisi a mi blandit, vel sollicitudin diam facilisis.",
                likes: 1527,
                user: "5c7ecf9eb8a7020d42fb850c",
                date: "2019-01-28T13:37:27.000Z"
            },
            {
                contestId: "5c7ecfd5469be00dbe18c5fa",
                text:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                likes: 1527,
                user: "5c7ecf9eb8a7020d42fb850b",
                date: "2019-03-11T13:37:27.000Z"
            },
            {
                contestId: "5c7ecfd5469be00dbe18c5fa",
                text:
                    "Nunc tincidunt nunc nec ligula suscipit, a dignissim lectus ornare. Aenean bibendum magna libero.",
                likes: 87,
                user: "5c7ecf9eb8a7020d42fb850c",
                date: "2019-01-02T13:37:27.000Z"
            },
            {
                contestId: "5c7ecfd5469be00dbe18c5fa",
                text:
                    "Suspendisse lacinia ultricies nunc id ornare. Etiam orci risus, vestibulum ut congue vitae, ornare id orci. Etiam ultrices cursus mauris, vel lacinia elit. ",
                likes: 427,
                user: "5c7ecf9eb8a7020d42fb850a",
                date: "2019-02-09T13:37:27.000Z"
            },
            {
                contestId: "5c7ecfd5469be00dbe18c5fa",
                text:
                    "Donec feugiat venenatis lectus vitae eleifend. Proin vel ligula mauris.",
                likes: 1527,
                user: "5c7ecf9eb8a7020d42fb850a",
                date: "2019-01-01T13:37:27.000Z"
            },
            {
                contestId: "5c7ecfd5469be00dbe18c5fa",
                text:
                    "Aenean consequat velit sit amet pharetra consectetur. Integer fermentum nisi a mi blandit, vel sollicitudin diam facilisis.",
                likes: 227,
                user: "5c7ecf9eb8a7020d42fb850b",
                date: "2019-02-13T13:37:27.000Z"
            },
            {
                contestId: "5c7ecfd5469be00dbe18c5fb",
                text:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                likes: 5002,
                user: "5c7ecf9eb8a7020d42fb850c",
                date: "2019-02-08T13:37:27.000Z"
            },
            {
                contestId: "5c7ecfd5469be00dbe18c5fb",
                text:
                    "Nunc tincidunt nunc nec ligula suscipit, a dignissim lectus ornare. Aenean bibendum magna libero.",
                likes: 425,
                user: "5c7ecf9eb8a7020d42fb850b",
                date: "2018-02-21T13:37:27.000Z"
            },
            {
                contestId: "5c7ecfd5469be00dbe18c5fb",
                text:
                    "Suspendisse lacinia ultricies nunc id ornare. Etiam orci risus, vestibulum ut congue vitae, ornare id orci. Etiam ultrices cursus mauris, vel lacinia elit. ",
                likes: 433,
                user: "5c7ecf9eb8a7020d42fb850b",
                date: "2017-02-18T13:37:27.000Z"
            },
            {
                contestId: "5c7ecfd5469be00dbe18c5fb",
                text:
                    "Donec feugiat venenatis lectus vitae eleifend. Proin vel ligula mauris.",
                likes: 4998,
                user: "5c7ecf9eb8a7020d42fb850b",
                date: "2019-02-10T13:37:27.000Z"
            },
            {
                contestId: "5c7ecfd5469be00dbe18c5fb",
                text:
                    "Aenean consequat velit sit amet pharetra consectetur. Integer fermentum nisi a mi blandit, vel sollicitudin diam facilisis.",
                likes: 429,
                user: "5c7ecf9eb8a7020d42fb850a",
                date: "2016-01-15T13:37:27.000Z"
            },
            {
                contestId: "5c7ecfd5469be00dbe18c5fc",
                text:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                likes: 1227,
                user: "5c7ecf9eb8a7020d42fb850c",
                date: "2019-02-10T13:37:27.000Z"
            },
            {
                contestId: "5c7ecfd5469be00dbe18c5fc",
                text:
                    "Nunc tincidunt nunc nec ligula suscipit, a dignissim lectus ornare. Aenean bibendum magna libero.",
                likes: 1827,
                user: "5c7ecf9eb8a7020d42fb850a",
                date: "2019-01-01T13:37:27.000Z"
            },
            {
                contestId: "5c7ecfd5469be00dbe18c5fc",
                text:
                    "Suspendisse lacinia ultricies nunc id ornare. Etiam orci risus, vestibulum ut congue vitae, ornare id orci. Etiam ultrices cursus mauris, vel lacinia elit. ",
                likes: 433,
                user: "5c7ecf9eb8a7020d42fb850a",
                date: "2019-02-06T13:37:27.000Z"
            },
            {
                contestId: "5c7ecfd5469be00dbe18c5fc",
                text:
                    "Donec feugiat venenatis lectus vitae eleifend. Proin vel ligula mauris.",
                likes: 435,
                user: "5c7ecf9eb8a7020d42fb850b",
                date: "2019-02-12T13:37:27.000Z"
            },
            {
                contestId: "5c7ecfd5469be00dbe18c5fc",
                text:
                    "Aenean consequat velit sit amet pharetra consectetur. Integer fermentum nisi a mi blandit, vel sollicitudin diam facilisis.",
                likes: 2278,
                user: "5c7ecf9eb8a7020d42fb850b",
                date: "2019-01-06T13:37:27.000Z"
            },
            {
                contestId: "5c7ecfd5469be00dbe18c5fd",
                text:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                likes: 1227,
                user: "5c7ecf9eb8a7020d42fb850c",
                date: "2019-02-18T13:37:27.000Z"
            },
            {
                contestId: "5c7ecfd5469be00dbe18c5fd",
                text:
                    "Nunc tincidunt nunc nec ligula suscipit, a dignissim lectus ornare. Aenean bibendum magna libero.",
                likes: 1528,
                user: "5c7ecf9eb8a7020d42fb850b",
                date: "2019-02-02T13:37:27.000Z"
            },
            {
                contestId: "5c7ecfd5469be00dbe18c5fd",
                text:
                    "Suspendisse lacinia ultricies nunc id ornare. Etiam orci risus, vestibulum ut congue vitae, ornare id orci. Etiam ultrices cursus mauris, vel lacinia elit. ",
                likes: 28,
                user: "5c7ecf9eb8a7020d42fb850c",
                date: "2019-01-15T13:37:27.000Z"
            },
            {
                contestId: "5c7ecfd5469be00dbe18c5fd",
                text:
                    "Donec feugiat venenatis lectus vitae eleifend. Proin vel ligula mauris.",
                likes: 26,
                user: "5c7ecf9eb8a7020d42fb850b",
                date: "2019-02-15T13:37:27.000Z"
            },
            {
                contestId: "5c7ecfd5469be00dbe18c5fd",
                text:
                    "Aenean consequat velit sit amet pharetra consectetur. Integer fermentum nisi a mi blandit, vel sollicitudin diam facilisis.",
                likes: 27,
                user: "5c7ecf9eb8a7020d42fb850a",
                date: "2019-02-20T13:37:27.000Z"
            },
            {
                contestId: "5c7ecfd5469be00dbe18c5fe",
                text:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                likes: 1227,
                user: "5c7ecf9eb8a7020d42fb850a",
                date: "2019-02-07T13:37:27.000Z"
            },
            {
                contestId: "5c7ecfd5469be00dbe18c5fe",
                text:
                    "Nunc tincidunt nunc nec ligula suscipit, a dignissim lectus ornare. Aenean bibendum magna libero.",
                likes: 1827,
                user: "5c7ecf9eb8a7020d42fb850a",
                date: "2019-01-27T13:37:27.000Z"
            },
            {
                contestId: "5c7ecfd5469be00dbe18c5fe",
                text:
                    "Suspendisse lacinia ultricies nunc id ornare. Etiam orci risus, vestibulum ut congue vitae, ornare id orci. Etiam ultrices cursus mauris, vel lacinia elit. ",
                likes: 1228,
                user: "5c7ecf9eb8a7020d42fb850c",
                date: "2019-01-19T13:37:27.000Z"
            },
            {
                contestId: "5c7ecfd5469be00dbe18c5fe",
                text:
                    "Donec feugiat venenatis lectus vitae eleifend. Proin vel ligula mauris.",
                likes: 1527,
                user: "5c7ecf9eb8a7020d42fb850b",
                date: "2019-02-03T13:37:27.000Z"
            },
            {
                contestId: "5c7ecfd5469be00dbe18c5fe",
                text:
                    "Aenean consequat velit sit amet pharetra consectetur. Integer fermentum nisi a mi blandit, vel sollicitudin diam facilisis.",
                likes: 1227,
                user: "5c7ecf9eb8a7020d42fb850a",
                date: "2019-01-01T13:37:27.000Z"
            },
            {
                contestId: "5c7ecfd5469be00dbe18c5fe",
                text:
                    "Aenean consequat velit sit amet pharetra consectetur. Integer fermentum nisi a mi blandit, vel sollicitudin diam facilisis.",
                likes: 1227,
                user: "5c7ecf9eb8a7020d42fb850c",
                date: "2019-01-01T13:37:27.000Z"
            },
            {
                contestId: "5c7ecfd5469be00dbe18c5fe",
                text:
                    "Aenean consequat velit sit amet pharetra consectetur. Integer fermentum nisi a mi blandit, vel sollicitudin diam facilisis.",
                likes: 1227,
                user: "5c7ecf9eb8a7020d42fb850b",
                date: "2018-12-11T13:37:27.000Z"
            },
            {
                contestId: "5c7ecfd5469be00dbe18c5fe",
                text:
                    "Aenean consequat velit sit amet pharetra consectetur. Integer fermentum nisi a mi blandit, vel sollicitudin diam facilisis.",
                likes: 35,
                user: "5c7ecf9eb8a7020d42fb850c",
                date: "2019-03-03T13:37:27.000Z"
            },
            {
                contestId: "5c7ecfd5469be00dbe18c5fe",
                text:
                    "Aenean consequat velit sit amet pharetra consectetur. Integer fermentum nisi a mi blandit, vel sollicitudin diam facilisis.",
                likes: 2134,
                user: "5c7ecf9eb8a7020d42fb850a",
                date: "2019-01-11T13:37:27.000Z"
            },
            {
                contestId: "5c7ecfd5469be00dbe18c5fe",
                text:
                    "Aenean consequat velit sit amet pharetra consectetur. Integer fermentum nisi a mi blandit, vel sollicitudin diam facilisis.",
                likes: 301,
                user: "5c7ecf9eb8a7020d42fb850a",
                date: "2018-12-12T13:37:27.000Z"
            },
            {
                contestId: "5c7ecfd5469be00dbe18c5fe",
                text:
                    "Aenean consequat velit sit amet pharetra consectetur. Integer fermentum nisi a mi blandit, vel sollicitudin diam facilisis.",
                likes: 567,
                user: "5c7ecf9eb8a7020d42fb850c",
                date: "2019-03-06T13:37:27.000Z"
            },
            {
                contestId: "5c7ecfd5469be00dbe18c5fe",
                text:
                    "Aenean consequat velit sit amet pharetra consectetur. Integer fermentum nisi a mi blandit, vel sollicitudin diam facilisis.",
                likes: 54,
                user: "5c7ecf9eb8a7020d42fb850b",
                date: "2018-03-01T13:37:27.000Z"
            }
        ])
        .then(response => {
            console.info("Entries", response.insertedCount);
            client.close();
        });
});
