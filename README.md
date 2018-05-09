# chess
A chess app from scratch. Challenge friends and play at your convenience.

# notes
reduce reducers?
babel polyfill in webpack?
'startup file'?
https://stackoverflow.com/questions/33527653/babel-6-regeneratorruntime-is-not-defined
# stories
signs up: POST
/users/signup

logs in: POST
/users/login

logs out: POST
/users/logout

views own/another's profile: GET
/users/profile/:user_id

searches for other user: GET
/users/:user_id

visits friends page: GET
/friends/

requests friend: POST
/friends/request

accepts friend: PUT
/friends/accept

declines friend: DELETE
/friends/decline

vists games page: GET
/games/

accesses past or current game: GET
/games/:game_id

challenges friend to a game: POST
/games/challenge

accept challange from friend: PUT
/games/accept

declines challenges: DELETE
/games/decline

user makes a move: PUT
/games/update

user finishes a game: PUT
/games/save

# schema design // TODO: change this to screenshot once finalized
<?xml version="1.0" encoding="utf-8" ?>
<!-- SQL XML created by WWW SQL Designer, https://github.com/ondras/wwwsqldesigner/ -->
<!-- Active URL: http://ondras.zarovi.cz/sql/demo/?keyword=default -->
<sql>
<datatypes db="mysql">
    <group color="rgb(238,238,170)" label="Numeric">
        <type label="Integer" quote="" sql="INTEGER" length="0"/>
         <type label="TINYINT" quote="" sql="TINYINT" length="0"/>
         <type label="SMALLINT" quote="" sql="SMALLINT" length="0"/>
         <type label="MEDIUMINT" quote="" sql="MEDIUMINT" length="0"/>
         <type label="INT" quote="" sql="INT" length="0"/>
        <type label="BIGINT" quote="" sql="BIGINT" length="0"/>
        <type label="Decimal" quote="" sql="DECIMAL" length="1" re="DEC"/>
        <type label="Single precision" quote="" sql="FLOAT" length="0"/>
        <type label="Double precision" quote="" sql="DOUBLE" length="0" re="DOUBLE"/>
    </group>

    <group color="rgb(255,200,200)" label="Character">
        <type label="Char" quote="'" sql="CHAR" length="1"/>
        <type label="Varchar" quote="'" sql="VARCHAR" length="1"/>
        <type label="Text" quote="'" sql="MEDIUMTEXT" length="0" re="TEXT"/>
        <type label="Binary" quote="'" sql="BINARY" length="1"/>
        <type label="Varbinary" quote="'" sql="VARBINARY" length="1"/>
        <type label="BLOB" quote="'" sql="BLOB" length="0" re="BLOB"/>
    </group>

    <group color="rgb(200,255,200)" label="Date &amp; Time">
        <type label="Date" quote="'" sql="DATE" length="0"/>
        <type label="Time" quote="'" sql="TIME" length="0"/>
        <type label="Datetime" quote="'" sql="DATETIME" length="0"/>
        <type label="Year" quote="" sql="YEAR" length="0"/>
        <type label="Timestamp" quote="'" sql="TIMESTAMP" length="0"/>
    </group>
    
    <group color="rgb(200,200,255)" label="Miscellaneous">
        <type label="ENUM" quote="" sql="ENUM" length="1"/>
        <type label="SET" quote="" sql="SET" length="1"/>
        <type label="Bit" quote="" sql="bit" length="0"/>
    </group>
</datatypes><table x="556" y="133" name="Users">
<row name="id" null="1" autoincrement="1">
<datatype>INTEGER</datatype>
<default>NULL</default></row>
<row name="username" null="1" autoincrement="0">
<datatype>VARCHAR</datatype>
<default>NULL</default></row>
<row name="password" null="1" autoincrement="0">
<datatype>VARCHAR</datatype>
<default>NULL</default></row>
<row name="wins" null="1" autoincrement="0">
<datatype>INTEGER</datatype>
<default>NULL</default></row>
<row name="losses" null="1" autoincrement="0">
<datatype>INTEGER</datatype>
<default>NULL</default></row>
<row name="draws" null="1" autoincrement="0">
<datatype>INTEGER</datatype>
<default>NULL</default></row>
<key type="PRIMARY" name="">
<part>id</part>
</key>
</table>
<table x="830" y="165" name="Games">
<row name="id" null="1" autoincrement="1">
<datatype>INTEGER</datatype>
<default>NULL</default></row>
<row name="current_position" null="1" autoincrement="0">
<datatype>VARCHAR</datatype>
<default>NULL</default></row>
<row name="move_history" null="1" autoincrement="0">
<datatype>INTEGER</datatype>
<default>NULL</default></row>
<row name="id_white" null="1" autoincrement="0">
<datatype>INTEGER</datatype>
<default>NULL</default><relation table="Users" row="id" />
</row>
<row name="id_black" null="1" autoincrement="0">
<datatype>INTEGER</datatype>
<default>NULL</default><relation table="Users" row="id" />
</row>
<row name="accepted" null="1" autoincrement="0">
<datatype>INTEGER</datatype>
<default>NULL</default></row>
<key type="PRIMARY" name="">
<part>id</part>
</key>
</table>
<table x="287" y="197" name="friends">
<row name="id" null="1" autoincrement="1">
<datatype>INTEGER</datatype>
<default>NULL</default></row>
<row name="id_user1" null="1" autoincrement="0">
<datatype>INTEGER</datatype>
<default>NULL</default><relation table="Users" row="id" />
</row>
<row name="id_user2" null="1" autoincrement="0">
<datatype>INTEGER</datatype>
<default>NULL</default><relation table="Users" row="id" />
</row>
<row name="accepted" null="1" autoincrement="0">
<datatype>INTEGER</datatype>
<default>NULL</default></row>
<key type="PRIMARY" name="">
<part>id</part>
</key>
</table>
</sql>