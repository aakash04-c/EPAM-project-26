import java.util.Arrays;
import java.util.Scanner;

public class Problem_No_1 {

    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        int n = sc.nextInt();
        long budget = sc.nextLong();

        int[] arr = new int[n];

        for (int i = 0; i < n; i++) {
            arr[i] = sc.nextInt();
        }

        Arrays.sort(arr);

        int count = 0;

        for (int i = 0; i < n; i++) {

            if (budget >= arr[i]) {
                budget -= arr[i];
                count++;
            } else {
                break;
            }
        }

        System.out.println(count);
    }
}