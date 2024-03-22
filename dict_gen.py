import json

def emplace_word(word, root):
    if len(word) == 0:
        root['val'] = 1
        return
    letter = word[0]
    try:
        node = root[letter]
    except KeyError:
        node = {}
        root[letter] = node
    emplace_word(word[1:], node)


def test_word(word, root):
    if len(word) == 0:
        return root.get('val', 0)
    node = root.get(word[0])
    return test_word(word[1:], node) if node else 0


if __name__ == '__main__':
    root = {}

    with open("dictionary.txt", 'r') as dict_file:
        dict_lines = dict_file.readlines()
    for word in dict_lines:
        word = word.strip()
        emplace_word(word, root)

    with open("dictionary.json", 'w+') as dict_json:
        json.dump(root, dict_json, sort_keys=True)

    print(test_word("zebra", root)) # 1
    print(test_word("adfasdfadfa", root)) # 0
