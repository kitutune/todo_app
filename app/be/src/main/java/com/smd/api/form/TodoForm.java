package com.smd.api.form;

import java.util.Date;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TodoForm {
    private Integer id;
    private Date productionDate;
    @NotNull
    private Date finalDeadline;
    @NotNull
    private String todo;
    private String isDone;
    @Size(min = 0, max = 1)
    private String priority;
}
