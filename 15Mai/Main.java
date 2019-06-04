import java.util.ArrayList;
import java.util.Arrays;
import java.util.Scanner;

/**
 * Main
 */

/*
INPUT:
3 5 7
2 6 8
*/
public class Main {
    static int[][] pool = {
        {1,2,3,4,5,6,7,8,9,10,11,12,13},
        {4,4,4,4,4,4,4,4,4,4,4,4,4}
    };

    static int sumA = 0;
    static int sumB = 0;
    static int difference;
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        for (int i = 0; i < 3; i++) {
            int card = sc.nextInt();
            sumA += card;
            pool[1][card-1] --;
        }
        for (int i = 0; i < 3; i++) {
            int card = sc.nextInt();
            sumB += card;
            pool[1][card-1] --;
        }
        difference = sumA -sumB;
        printPool(pool);
        // algo
        double rate = (double)getWinCase()/2070;
        System.out.printf("%.4f", rate);
    }

    static int getWinCase(){
        //boader condition
        if (difference<-11) {
            return 0;
        } else if(difference > 12){
            return 1;
        }
        
        int winCase = 0;
        System.out.println("Diff:"+difference);
        //don't take account into out of card
        if (difference<0){
            int my_start_value=0-difference+2; //owe 1 can take 3
            for (int i = my_start_value; i <= 13; i++) {
                int other_end_value = i+difference-1;
                pool[1][i-1] = pool[1][i-1]-1; //take i this card
                int iCase=0;
                for (int j = 1; j <= other_end_value; j++) {
                    iCase+=pool[1][j-1];
                }
                pool[1][i-1] = pool[1][i-1]+1; //give back i this card
                winCase=winCase+iCase*pool[1][i-1];
            }
        }else {
            System.out.println("todo diff>0");
        }
        System.out.println("winCase:"+winCase);
        return winCase;
    }

    static void printPool(int[][] p) {
        for (int[] ar : p) {
            System.out.println(Arrays.toString(ar));
        }
    }
}