import faker from "@faker-js/faker";
import { createDirectory, createFile } from "./scene2/helpers/files";

export function generateFakeFiles(tree, depth) {
    for (let i = 0; i < 10; i++) {
        const name = faker.hacker.noun()

        if (depth == 0) {
            tree[name] = createFile(name, faker.hacker.phrase());
        } else {
            tree[name] = createDirectory(name);
            tree[name].children = generateFakeFiles({}, depth - 1)
        }

    }
    return tree;
}

