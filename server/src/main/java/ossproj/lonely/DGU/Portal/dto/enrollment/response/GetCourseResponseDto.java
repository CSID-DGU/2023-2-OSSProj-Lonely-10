package ossproj.lonely.DGU.Portal.dto.enrollment.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
@AllArgsConstructor
public class GetCourseResponseDto {
   List<SubCourseDto> course;

   @Getter
   @AllArgsConstructor
   public static class SubCourseDto {
      @JsonProperty("course_name")
      private String courseName;

      @JsonProperty("course_code")
      private String courseCode;

      @JsonProperty("professor")
      private String professor;

      @JsonProperty("is_online")
      private boolean isOnline;
   }
}
