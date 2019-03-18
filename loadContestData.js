import { MongoClient } from "mongodb";
import assert from "assert";
import config from "./config";

MongoClient.connect(config.mongodbUri, (err, client) => {
    assert.equal(null, err);

    client
        .db("test")
        .collection("contests")
        .insertMany([
            {
                contestId: 0,
                date: "2019-02-11T13:37:27.000Z",
                entries: [
                    {
                        entryId: 1,
                        text:
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                        likes: 1527,
                        user: "5c7ecf9eb8a7020d42fb850a",
                        date: "2019-02-03T13:37:27.000Z"
                    },
                    {
                        entryId: 2,
                        text:
                            "Nunc tincidunt nunc nec ligula suscipit, a dignissim lectus ornare. Aenean bibendum magna libero.",
                        likes: 87,
                        user: "5c7ecf9eb8a7020d42fb850b",
                        date: "2019-02-01T13:37:27.000Z"
                    },
                    {
                        entryId: 3,
                        text:
                            "Suspendisse lacinia ultricies nunc id ornare. Etiam orci risus, vestibulum ut congue vitae, ornare id orci. Etiam ultrices cursus mauris, vel lacinia elit. ",
                        likes: 88,
                        user: "5c7ecf9eb8a7020d42fb850c",
                        date: "2019-02-11T13:37:27.000Z"
                    },
                    {
                        entryId: 4,
                        text:
                            "Donec feugiat venenatis lectus vitae eleifend. Proin vel ligula mauris.",
                        likes: 1527,
                        user: "5c7ecf9eb8a7020d42fb850b",
                        date: "2019-03-13T13:37:27.000Z"
                    },
                    {
                        entryId: 5,
                        text:
                            "Aenean consequat velit sit amet pharetra consectetur. Integer fermentum nisi a mi blandit, vel sollicitudin diam facilisis.",
                        likes: 1527,
                        user: "5c7ecf9eb8a7020d42fb850c",
                        date: "2019-01-28T13:37:27.000Z"
                    }
                ]
            },
            {
                contestId: 1,
                date: "2018-02-11T13:37:27.000Z",
                entries: [
                    {
                        entryId: 6,
                        text:
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                        likes: 1527,
                        user: "5c7ecf9eb8a7020d42fb850b",
                        date: "2019-03-11T13:37:27.000Z"
                    },
                    {
                        entryId: 7,
                        text:
                            "Nunc tincidunt nunc nec ligula suscipit, a dignissim lectus ornare. Aenean bibendum magna libero.",
                        likes: 87,
                        user: "5c7ecf9eb8a7020d42fb850c",
                        date: "2019-01-02T13:37:27.000Z"
                    },
                    {
                        entryId: 8,
                        text:
                            "Suspendisse lacinia ultricies nunc id ornare. Etiam orci risus, vestibulum ut congue vitae, ornare id orci. Etiam ultrices cursus mauris, vel lacinia elit. ",
                        likes: 427,
                        user: "5c7ecf9eb8a7020d42fb850a",
                        date: "2019-02-09T13:37:27.000Z"
                    },
                    {
                        entryId: 9,
                        text:
                            "Donec feugiat venenatis lectus vitae eleifend. Proin vel ligula mauris.",
                        likes: 1527,
                        user: "5c7ecf9eb8a7020d42fb850a",
                        date: "2019-01-01T13:37:27.000Z"
                    },
                    {
                        entryId: 10,
                        text:
                            "Aenean consequat velit sit amet pharetra consectetur. Integer fermentum nisi a mi blandit, vel sollicitudin diam facilisis.",
                        likes: 227,
                        user: "5c7ecf9eb8a7020d42fb850b",
                        date: "2019-02-13T13:37:27.000Z"
                    }
                ]
            },
            {
                contestId: 2,
                date: "2019-01-10T13:37:27.000Z",
                entries: [
                    {
                        entryId: 11,
                        text:
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                        likes: 5002,
                        user: "5c7ecf9eb8a7020d42fb850c",
                        date: "2019-02-08T13:37:27.000Z"
                    },
                    {
                        entryId: 12,
                        text:
                            "Nunc tincidunt nunc nec ligula suscipit, a dignissim lectus ornare. Aenean bibendum magna libero.",
                        likes: 425,
                        user: "5c7ecf9eb8a7020d42fb850b",
                        date: "2018-02-21T13:37:27.000Z"
                    },
                    {
                        entryId: 13,
                        text:
                            "Suspendisse lacinia ultricies nunc id ornare. Etiam orci risus, vestibulum ut congue vitae, ornare id orci. Etiam ultrices cursus mauris, vel lacinia elit. ",
                        likes: 433,
                        user: "5c7ecf9eb8a7020d42fb850b",
                        date: "2017-02-18T13:37:27.000Z"
                    },
                    {
                        entryId: 14,
                        text:
                            "Donec feugiat venenatis lectus vitae eleifend. Proin vel ligula mauris.",
                        likes: 4998,
                        user: "5c7ecf9eb8a7020d42fb850b",
                        date: "2019-02-10T13:37:27.000Z"
                    },
                    {
                        entryId: 15,
                        text:
                            "Aenean consequat velit sit amet pharetra consectetur. Integer fermentum nisi a mi blandit, vel sollicitudin diam facilisis.",
                        likes: 429,
                        user: "5c7ecf9eb8a7020d42fb850a",
                        date: "2016-01-15T13:37:27.000Z"
                    }
                ]
            },
            {
                contestId: 3,
                date: "2019-02-23T13:37:27.000Z",
                entries: [
                    {
                        entryId: 16,
                        text:
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                        likes: 1227,
                        user: "5c7ecf9eb8a7020d42fb850c",
                        date: "2019-02-10T13:37:27.000Z"
                    },
                    {
                        entryId: 17,
                        text:
                            "Nunc tincidunt nunc nec ligula suscipit, a dignissim lectus ornare. Aenean bibendum magna libero.",
                        likes: 1827,
                        user: "5c7ecf9eb8a7020d42fb850a",
                        date: "2019-01-01T13:37:27.000Z"
                    },
                    {
                        entryId: 18,
                        text:
                            "Suspendisse lacinia ultricies nunc id ornare. Etiam orci risus, vestibulum ut congue vitae, ornare id orci. Etiam ultrices cursus mauris, vel lacinia elit. ",
                        likes: 433,
                        user: "5c7ecf9eb8a7020d42fb850a",
                        date: "2019-02-06T13:37:27.000Z"
                    },
                    {
                        entryId: 19,
                        text:
                            "Donec feugiat venenatis lectus vitae eleifend. Proin vel ligula mauris.",
                        likes: 435,
                        user: "5c7ecf9eb8a7020d42fb850b",
                        date: "2019-02-12T13:37:27.000Z"
                    },
                    {
                        entryId: 20,
                        text:
                            "Aenean consequat velit sit amet pharetra consectetur. Integer fermentum nisi a mi blandit, vel sollicitudin diam facilisis.",
                        likes: 2278,
                        user: "5c7ecf9eb8a7020d42fb850b",
                        date: "2019-01-06T13:37:27.000Z"
                    }
                ]
            },
            {
                contestId: 4,
                date: "2019-03-12T13:37:27.000Z",
                entries: [
                    {
                        entryId: 21,
                        text:
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                        likes: 1227,
                        user: "5c7ecf9eb8a7020d42fb850c",
                        date: "2019-02-18T13:37:27.000Z"
                    },
                    {
                        entryId: 22,
                        text:
                            "Nunc tincidunt nunc nec ligula suscipit, a dignissim lectus ornare. Aenean bibendum magna libero.",
                        likes: 1528,
                        user: "5c7ecf9eb8a7020d42fb850b",
                        date: "2019-02-02T13:37:27.000Z"
                    },
                    {
                        entryId: 23,
                        text:
                            "Suspendisse lacinia ultricies nunc id ornare. Etiam orci risus, vestibulum ut congue vitae, ornare id orci. Etiam ultrices cursus mauris, vel lacinia elit. ",
                        likes: 28,
                        user: "5c7ecf9eb8a7020d42fb850c",
                        date: "2019-01-15T13:37:27.000Z"
                    },
                    {
                        entryId: 24,
                        text:
                            "Donec feugiat venenatis lectus vitae eleifend. Proin vel ligula mauris.",
                        likes: 26,
                        user: "5c7ecf9eb8a7020d42fb850b",
                        date: "2019-02-15T13:37:27.000Z"
                    },
                    {
                        entryId: 25,
                        text:
                            "Aenean consequat velit sit amet pharetra consectetur. Integer fermentum nisi a mi blandit, vel sollicitudin diam facilisis.",
                        likes: 27,
                        user: "5c7ecf9eb8a7020d42fb850a",
                        date: "2019-02-20T13:37:27.000Z"
                    }
                ]
            },
            {
                contestId: 5,
                date: "2019-03-22T13:37:27.000Z",
                entries: [
                    {
                        entryId: 26,
                        text:
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                        likes: 1227,
                        user: "5c7ecf9eb8a7020d42fb850a",
                        date: "2019-02-07T13:37:27.000Z"
                    },
                    {
                        entryId: 27,
                        text:
                            "Nunc tincidunt nunc nec ligula suscipit, a dignissim lectus ornare. Aenean bibendum magna libero.",
                        likes: 1827,
                        user: "5c7ecf9eb8a7020d42fb850a",
                        date: "2019-01-27T13:37:27.000Z"
                    },
                    {
                        entryId: 28,
                        text:
                            "Suspendisse lacinia ultricies nunc id ornare. Etiam orci risus, vestibulum ut congue vitae, ornare id orci. Etiam ultrices cursus mauris, vel lacinia elit. ",
                        likes: 1228,
                        user: "5c7ecf9eb8a7020d42fb850c",
                        date: "2019-01-19T13:37:27.000Z"
                    },
                    {
                        entryId: 29,
                        text:
                            "Donec feugiat venenatis lectus vitae eleifend. Proin vel ligula mauris.",
                        likes: 1527,
                        user: "5c7ecf9eb8a7020d42fb850b",
                        date: "2019-02-03T13:37:27.000Z"
                    },
                    {
                        entryId: 30,
                        text:
                            "Aenean consequat velit sit amet pharetra consectetur. Integer fermentum nisi a mi blandit, vel sollicitudin diam facilisis.",
                        likes: 1227,
                        user: "5c7ecf9eb8a7020d42fb850a",
                        date: "2019-01-01T13:37:27.000Z"
                    },
                    {
                        entryId: 31,
                        text:
                            "Aenean consequat velit sit amet pharetra consectetur. Integer fermentum nisi a mi blandit, vel sollicitudin diam facilisis.",
                        likes: 1227,
                        user: "5c7ecf9eb8a7020d42fb850c",
                        date: "2019-01-01T13:37:27.000Z"
                    },
                    {
                        entryId: 32,
                        text:
                            "Aenean consequat velit sit amet pharetra consectetur. Integer fermentum nisi a mi blandit, vel sollicitudin diam facilisis.",
                        likes: 1227,
                        user: "5c7ecf9eb8a7020d42fb850b",
                        date: "2018-12-11T13:37:27.000Z"
                    },
                    {
                        entryId: 33,
                        text:
                            "Aenean consequat velit sit amet pharetra consectetur. Integer fermentum nisi a mi blandit, vel sollicitudin diam facilisis.",
                        likes: 35,
                        user: "5c7ecf9eb8a7020d42fb850c",
                        date: "2019-03-03T13:37:27.000Z"
                    },
                    {
                        entryId: 34,
                        text:
                            "Aenean consequat velit sit amet pharetra consectetur. Integer fermentum nisi a mi blandit, vel sollicitudin diam facilisis.",
                        likes: 2134,
                        user: "5c7ecf9eb8a7020d42fb850a",
                        date: "2019-01-11T13:37:27.000Z"
                    },
                    {
                        entryId: 35,
                        text:
                            "Aenean consequat velit sit amet pharetra consectetur. Integer fermentum nisi a mi blandit, vel sollicitudin diam facilisis.",
                        likes: 301,
                        user: "5c7ecf9eb8a7020d42fb850a",
                        date: "2018-12-12T13:37:27.000Z"
                    },
                    {
                        entryId: 36,
                        text:
                            "Aenean consequat velit sit amet pharetra consectetur. Integer fermentum nisi a mi blandit, vel sollicitudin diam facilisis.",
                        likes: 567,
                        user: "5c7ecf9eb8a7020d42fb850c",
                        date: "2019-03-06T13:37:27.000Z"
                    },
                    {
                        entryId: 37,
                        text:
                            "Aenean consequat velit sit amet pharetra consectetur. Integer fermentum nisi a mi blandit, vel sollicitudin diam facilisis.",
                        likes: 54,
                        user: "5c7ecf9eb8a7020d42fb850b",
                        date: "2018-03-01T13:37:27.000Z"
                    }
                ]
            }
        ])
        .then(response => {
            console.info("Users", response.insertedCount);
            client.close();
        });
});