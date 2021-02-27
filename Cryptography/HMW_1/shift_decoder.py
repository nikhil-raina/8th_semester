
from itertools import cycle

def character_counter(f):
    character_book = dict()
    for line in f:
        for character in line:
            if not character == ' ' and not character == '\n':
                character = character.lower()
                try:
                    character_book[character] += 1
                except:
                    character_book[character] = 1
    return {k: v for k, v in sorted(character_book.items(), key=lambda item: item[1], reverse=True)}


def print_characters(character_book):
    file = open('frequency_counted_characters.txt', 'w')
    for key, value in character_book.items():
        printer = 'For encrypted letter [' + str(key) + '] the frequency is => ' + str(value) + '\n'
        file.write(printer)
    file.close()


def decoder(character_book, f):
    decrypted_alphabet = ['f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','a','b','c','d','e']
    encrypted_alphabet = cycle(sorted(decrypted_alphabet))
    decrypt_counter = 0
    most_common = list(character_book.keys())[0]
    for letter in encrypted_alphabet:
        if letter == most_common:
            break
    
    for encrypted_letter in encrypted_alphabet:
        if decrypt_counter == 26:
            break
        character_book[encrypted_letter] = decrypted_alphabet[decrypt_counter]
        decrypt_counter += 1
    
    text = ''
    for line in f:
        for character in line:
            character = character.lower()
            try:
                text += character_book[character]
            except:
                text += character
    return text
    

if __name__ == '__main__':
    file_path = 'Dro rewkx xkdsyx yp Cdybwgsxn rkn pkvvox lopybo dro Rybno. Uxsqrd Mrkwzsyx Kxnesx \n\
Vydrkb qkdrobon dro cmkddobon bowxkxdc yp dro rewkx kbwi kxn von dro bopeqooc \n\
xybdr kmbycc dro Qbokd Cok dy dro usxqnyw yp Vybnkobyx. Li oxvscdsxq dro ksn yp \n\
ydrob xkdsyxc - rewkxc, qxywoc, ovfoc, kxn ngkbfoc - Vydrkb rovzon pybw k qbokd \n\
Kvvskxmo dy cdkxn kqksxcd dro ybmc kxn drosb bedrvocc xog voknob, Ybqbsw \n\
Nyywrkwwob. Dro coowsxqvi excdyzzklvo Rybno myxdsxeon sdc bkwzkqo, bosxpybmsxq \n\
sdc qbygsxq kbwi gsdr ckfkqo dbyvvc kxn lbedscr yqboc. Led, yx dro ofo yp fsmdybi, \n\
Qev\'nkx kxn rsc pyvvygobc covpscrvi klkxnyxon drosb kvvsoc dy coou yed zygobpev \n\
kbdspkmdc, pybmsxq dro gokuoxon Rybno dy bodbokd. Nyywrkwwob wywoxdkbsvi \n\
bkvvson dro ybmc grox ro cvog Vydrkb sx k rkbbygsxq lkddvo, led dro roby\'c nokdr nsn \n\
xyd lboku dro Kvvskxmo\'c bocyvfo. Debkviyx, Vydrkb\'c vyikv vsoedoxkxd, aesmuvi dyyu ez \n\
voknobcrsz yp Kjobydr\'c nopoxnobc kxn psxkvvi nopokdon dro Rybno.'
    book = character_counter(file_path)
    print_characters(book)
    text = decoder(book, file_path)
    file = open('decripted_text.txt', 'w')
    file.write(text)
    file.close()
