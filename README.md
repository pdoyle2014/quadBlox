# quadBlox
After developing browser-based versions of a card matching game and a SIMON game, I decided to pursue a game with richer animation and more complex logic. 
Tetris was an obvious choice, since I enjoy playing it so much! 
Quad Blox is my version of Tetris, the iconic brick-stacking game.

Quad Blox is powered by JavaScript logic and DOM manipulation. 
The game board is divided into an array of columns within Bootstrap rows.
Programtically, the status of the gameboard is saved in an array of arrays, where each row on the game board gets its own array.
Each time a piece falls one space toward the bottom, the elements within the game board changed color to represent this change to the user.
Simultaneously, the state variable changes to reflect the current position of the piece.

With each "tick" of the clock, the game piece falls one level.
At that point, the JavaScript logic checks to see whether the space below is clear.
If the space below is not clear, then the piece must come to rest. 

Once the piece comes to rest, a function checks to see if any rows are completely full.
Full rows automatically get cleared from the board.
Any rows above cleared rows shift downward, the players score increases by 1, and a new randomized piece is introduced into the game board.


To maximize her score, a player should go for as many multi-line clears as possible.
Each time ANY NUMBER of rows is cleared, the rate of descent of the bricks increases by the same amount - no matter if 1, 2, 3, or 4 rows is cleared.
Therefore, by clearing rows 4-at-a-time, players can maximize their score while minimizing the speed of the blocks!
