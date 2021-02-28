def hex_to_bin(hexadecimal):
  return str('{0:08b}'.format(int(hexadecimal, 16)))


def reduction(binary):
  new_str = binary[0]
  for counter in range(1, len(binary) - 1):
    if not counter % 8 == 0:
      new_str += binary[counter]
  return new_str


def bin_to_hex(binary_element):
  return hex(int(binary_element, 2)).lstrip('0x').rstrip('L')


def lshift(bin, shift):
  middle = (len(bin) // 2) - 1
  left = bin[0:middle]
  right = bin[middle:]
  new_left = left[shift:] + left[0:shift]
  new_right = right[shift:] + right[0:shift]
  return new_left, new_right


if __name__ == '__main__':
  code = 'BBBB55551111EEEE'
  binary = hex_to_bin(code)
  new_bin = reduction(binary)
  new_hex = str(bin_to_hex(new_bin)).upper()
  left, right = lshift(new_bin, 1)
  newer_hex = str(bin_to_hex(left+right)).upper()
  print('PC - 1: ' + new_hex)
  print('Key St: ' + newer_hex)
