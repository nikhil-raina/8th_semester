import time as t


def make32(x):
    """
    Convert x into a 32-bit integer.
    Here input x may be a long integer, in which case
    it is truncated to 32 bits and made of the correct sign.
    (That is, its 32 low-order bits are returned as an
    ordinary 32-bit twos-complement signed int.)
    """
    x = x % (2**32)
    if x >= 2**31:
        x = x - 2**32
    x = int(x)
    return x


def string_hash(v):
    """
    hash of string
    """
    if v == '':
        return 0
    else:
        x = ord(v[0])
        m = 10
        for c in v:
            x = make32((x*m) ^ ord(c))
        x ^= len(v)
        if x == -1:
            x = -2
        return hex(x & ((1 << 32) - 1))[2:]


def tester(collision_limit):
    input = 0
    hex_values = dict()
    collisions = 0
    start = t.time()
    print('-----------------------')
    while True:
        if collisions == collision_limit:
            end = t.time()
            print('Total time taken to find the collisions: ',
                  end - start, ' seconds')
            print('-----------------------')
            break
        binary_num = bin(input)[2:]
        hex_result = string_hash(binary_num)
        if hex_result in hex_values:
            collisions += 1
            print('Collision Occurred [', collisions, ']')
            print('Input 1 = ', hex_values[hex_result], ', with Binary: ', bin(
                hex_values[hex_result])[2:])
            print('Input 2 = ', input, ', with Binary: ', bin(input)[2:])
            print('32-bit Hash:', hex_result)
            print()
        else:
            hex_values[hex_result] = input
        input += 1


def main(collision_limit):
    tester(collision_limit)


if __name__ == '__main__':
  collision_limit = 2
  main(collision_limit)
