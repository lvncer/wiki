
public class IfAndFor {

    public static void main(String[] args) {
        int sum = 0;
        for (int i = 0; i < 5; i++) {
            if (i % 2 == 0) {
                sum += i;
            }
        }
        System.err.println("Sum of even numbers from 0 to 4:" + sum);
    }
}
