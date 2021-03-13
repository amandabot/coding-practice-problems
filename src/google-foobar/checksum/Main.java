import java.util.Arrays;

// For example, if the first worker in line has ID 0 and the security checkpoint
// line holds three workers, the process would look like this:
// 0 1 2 /
// 3 4 / 5
// 6 / 7 8
// where the trainers' XOR (^) checksum is 0^1^2^3^4^6 == 2.

// Likewise, if the first worker has ID 17 and the checkpoint holds four
// workers, the process would look like:
// 17 18 19 20 /
// 21 22 23 / 24
// 25 26 / 27 28
// 29 / 30 31 32
// which produces the checksum 17^18^19^20^21^22^23^25^26^29 == 14.

// All worker IDs (including the first worker) are between 0 and 2000000000
// inclusive, and the checkpoint line will always be at least 1 worker int.

// With this information, write a function solution(start, length) that will
// cover for the missing security checkpoint by outputting the checksum
public class Main {

    public static void main(String[] args) {
        var inputs = new int[][] { { 0, 3 }, /* 2 */ { 17, 4 } /* 14 */ };

        Arrays.stream(inputs).forEach(input -> {
            System.out.println(solution(input[0], input[1]));
        });
    }

    public static int solution(int start, int length) {
        int checksum = 0;
        int omittedRows = 0;
        int rowStart = start;

        while (omittedRows < length) {
            checksum ^= calculateRowChecksum(rowStart, length - omittedRows);
            rowStart += length;
            omittedRows++;
        }

        return checksum;
    }

    public static int calculateRowChecksum(int start, int numberOfValues) {
        int checksum = 0;

        for (int index = 0; index < numberOfValues; index++) {
            checksum ^= start + index;
        }

        return checksum;
    }
}
