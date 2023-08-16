<?php
 class WP_SQLite_Token { const TYPE_NONE = 0; const TYPE_KEYWORD = 1; const TYPE_OPERATOR = 2; const TYPE_WHITESPACE = 3; const TYPE_COMMENT = 4; const TYPE_BOOL = 5; const TYPE_NUMBER = 6; const TYPE_STRING = 7; const TYPE_SYMBOL = 8; const TYPE_DELIMITER = 9; const TYPE_LABEL = 10; const FLAG_KEYWORD_RESERVED = 2; const FLAG_KEYWORD_COMPOSED = 4; const FLAG_KEYWORD_DATA_TYPE = 8; const FLAG_KEYWORD_KEY = 16; const FLAG_KEYWORD_FUNCTION = 32; const FLAG_NUMBER_HEX = 1; const FLAG_NUMBER_FLOAT = 2; const FLAG_NUMBER_APPROXIMATE = 4; const FLAG_NUMBER_NEGATIVE = 8; const FLAG_NUMBER_BINARY = 16; const FLAG_STRING_SINGLE_QUOTES = 1; const FLAG_STRING_DOUBLE_QUOTES = 2; const FLAG_COMMENT_BASH = 1; const FLAG_COMMENT_C = 2; const FLAG_COMMENT_SQL = 4; const FLAG_COMMENT_MYSQL_CMD = 8; const FLAG_OPERATOR_ARITHMETIC = 1; const FLAG_OPERATOR_LOGICAL = 2; const FLAG_OPERATOR_BITWISE = 4; const FLAG_OPERATOR_ASSIGNMENT = 8; const FLAG_OPERATOR_SQL = 16; const FLAG_SYMBOL_VARIABLE = 1; const FLAG_SYMBOL_BACKTICK = 2; const FLAG_SYMBOL_USER = 4; const FLAG_SYMBOL_SYSTEM = 8; const FLAG_SYMBOL_PARAMETER = 16; public $token; public $value; public $keyword; public $type; public $flags; public $position; public function __construct( $token, $type = 0, $flags = 0 ) { $this->token = $token; $this->type = $type; $this->flags = $flags; $this->keyword = null; $this->value = $this->extract(); } public function matches( $type = null, $flags = null, $values = null ) { if ( null === $type && null === $flags && ( null === $values || array() === $values ) ) { return ! $this->is_semantically_void(); } return ( ( null === $type || $this->type === $type ) && ( null === $flags || ( $this->flags & $flags ) ) && ( null === $values || in_array( strtoupper( $this->value ), $values, true ) ) ); } public function is_semantically_void() { return $this->matches( self::TYPE_WHITESPACE ) || $this->matches( self::TYPE_COMMENT ); } private function extract() { switch ( $this->type ) { case self::TYPE_KEYWORD: $this->keyword = strtoupper( $this->token ); if ( ! ( $this->flags & self::FLAG_KEYWORD_RESERVED ) ) { return $this->token; } return $this->keyword; case self::TYPE_WHITESPACE: return ' '; case self::TYPE_BOOL: return strtoupper( $this->token ) === 'TRUE'; case self::TYPE_NUMBER: $ret = str_replace( '--', '', $this->token ); if ( $this->flags & self::FLAG_NUMBER_HEX ) { if ( $this->flags & self::FLAG_NUMBER_NEGATIVE ) { $ret = str_replace( '-', '', $this->token ); $ret = -hexdec( $ret ); } else { $ret = hexdec( $ret ); } } elseif ( ( $this->flags & self::FLAG_NUMBER_APPROXIMATE ) || ( $this->flags & self::FLAG_NUMBER_FLOAT ) ) { $ret = (float) $ret; } elseif ( ! ( $this->flags & self::FLAG_NUMBER_BINARY ) ) { $ret = (int) $ret; } return $ret; case self::TYPE_STRING: $str = $this->token; $str = mb_substr( $str, 1, -1, 'UTF-8' ); $quote = $this->token[0]; $str = str_replace( $quote . $quote, $quote, $str ); $str = stripcslashes( $str ); return $str; case self::TYPE_SYMBOL: $str = $this->token; if ( isset( $str[0] ) && ( '@' === $str[0] ) ) { $str = mb_substr( $str, ! empty( $str[1] ) && ( '@' === $str[1] ) ? 2 : 1, mb_strlen( $str ), 'UTF-8' ); } if ( isset( $str[0] ) && ( ':' === $str[0] ) ) { $str = mb_substr( $str, 1, mb_strlen( $str ), 'UTF-8' ); } if ( isset( $str[0] ) && ( ( '`' === $str[0] ) || ( '"' === $str[0] ) || ( '\'' === $str[0] ) ) ) { $quote = $str[0]; $str = str_replace( $quote . $quote, $quote, $str ); $str = mb_substr( $str, 1, -1, 'UTF-8' ); } return $str; } return $this->token; } } 