import java.util.ArrayList;
import java.util.Scanner;

/**
 * common
 */
public class common {

    public static void main(String[] args) {
        System.out.println("start");
        Scanner sc = new Scanner(System.in);
        while (!sc.hasNext("0")) {
            System.out.println("content: " + sc.nextInt());
        }
        sc.close();
        System.out.println("finish");

        int[] a = new int[4]; // a[0-3]
        ArrayList<Integer> ar = new ArrayList<Integer>();

        System.out.println(Integer.toHexString(10));
        System.out.println(Integer.toHexString(985));
    }
}