import java.util.Arrays;
import java.lang.Integer;

public class Main {

    public static void main(String[] args) {
        // String[] values = new String[] {"1.11", "2.0.0", "1.2", "2", "0.1", "1.2.1",
        // "1.1.1", "2.0"};
        // Output: 0.1,1.1.1,1.2,1.2.1,1.11,2,2.0,2.0.0
        // String[] values = new String[] {"1.1.2", "1.0", "1.3.3", "1.0.12", "1.0.2"};
        // Output: 1.0,1.0.2,1.0.12,1.1.2,1.3.3

        String[] values = new String[] { "1.0.0", "1.0", "1", "0", "0.0", "0.0.1", "2.3.4", "2.34.4" };
        String[] solution = solution(values);
        System.out.println(Arrays.toString(solution));
    }

    public static String[] solution(String[] l) {
        Arrays.sort(l, (String a, String b) -> {
            String[] aSegments = a.split("[.]");
            String[] bSegments = b.split("[.]");

            int comparison = 0;
            for (int i = 0; i < 3; i++) {
                comparison = compareSegment(aSegments, bSegments, i);
                if (comparison != 0) {
                    break;
                }
            }

            return comparison;
        });
        return l;
    }

    public static int compareSegment(String[] a, String[] b, int index) {
        int aSegment = index < a.length ? Integer.parseInt(a[index], 10) : -1;
        int bSegment = index < b.length ? Integer.parseInt(b[index], 10) : -1;
        return aSegment - bSegment;
    }
}
