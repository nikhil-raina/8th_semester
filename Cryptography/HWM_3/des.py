import math

def hex_to_bin(hexadecimal):
  return str('{0:08b}'.format(int(hexadecimal, 16)))


def reduction(binary):
  new_str = binary[0]
  for counter in range(1, len(binary) - 1):
    if not counter % 8 == 0:
      new_str += binary[counter]
  return new_str

def bin_to_hex(binary):
  return hex(int(binary, 2)).lstrip('0x').rstrip('L')

if __name__ == '__main__':
  code = 'BBBB55551111EEEE'
  binary = hex_to_bin(code)
  new_bin = reduction(binary)
  new_hex = str(bin_to_hex(new_bin)).upper()
  print('PC - 1' + new_hex)