<template>
    <div>
        <!-- 线性回归的结果展示 -->
        <div v-if="method=='LinearRegression'">
            <div>
                <b>Coefficients:</b>
                <br>
                <table class="table table-striped" style="background:rgb(235,235,235);">
                    <tr>
                        <td></td>
                        <td>Estimate</td>
                        <td>Std.Error</td>
                        <td>t_value</td>
                        <td>Pr(>|t|)</td>
                    </tr>
                    <tr v-for="(value,key) in result['coefficients']">
                        <td><b>{{key}}</b></td>
                        <td>{{value["Estimate"]}}</td>
                        <td>{{value["Std. Error"]}}</td>
                        <td>{{value["t value"]}}</td>
                        <td>{{value["Pr(>|t|)"]}}</td>
                    </tr>
                </table>
                <b>Residuals:</b>
                <table class="table table-striped" style="background:rgb(235,235,235);">
                    <tr>
                        <td>Min</td>
                        <td>1Q</td>
                        <td>Median</td>
                        <td>3Q</td>
                        <td>Max</td>
                    </tr>
                    <tr>
                        <td>{{result.residuals["Min"]}}</td>
                        <td>{{result.residuals["1Q"]}}</td>
                        <td>{{result.residuals["Median"]}}</td>
                        <td>{{result.residuals["3Q"]}}</td>
                        <td>{{result.residuals["Max"]}}</td>
                    </tr>
                </table>
                <b>Residual standard error:&nbsp;</b>{{result["Residual standard error"]}}
                <br>
                <b>Multiple R-squared:&nbsp;</b>{{result["Multiple R-squared"]}}
                <br>
                <b>Adjusted R-squared:&nbsp;</b>{{result["Adjusted R-squared"]}}
                <br>
                <b>F-statistic:&nbsp;</b>{{result["F-statistic"]}}
            </div>
        </div>
        <!-- 逻辑回归的结果展示 -->
        <div v-else-if="method=='LogisticRegression'||method=='PoissonRegression'">
            <div>
                <b>Coefficients:</b>
                <br>
                <table class="table table-striped" style="background:rgb(235,235,235);">
                    <tr>
                        <td></td>
                        <td>Estimate</td>
                        <td>Std.Error</td>
                        <td>z_value</td>
                        <td>Pr(>|z|)</td>
                    </tr>
                    <tr v-for="(value,key) in result['coefficients']">
                        <td><b>{{key}}</b></td>
                        <td>{{value["Estimate"]}}</td>
                        <td>{{value["Std. Error"]}}</td>
                        <td>{{value["z value"]}}</td>
                        <td>{{value["Pr(>|z|)"]}}</td>
                    </tr>
                </table>
                <b>Deviance Residuals:</b>
                <table class="table table-striped" style="background:rgb(235,235,235);">
                    <tr>
                        <td>Min</td>
                        <td>1Q</td>
                        <td>Median</td>
                        <td>3Q</td>
                        <td>Max</td>
                    </tr>
                    <tr>
                        <td>{{result["deviance.resid"]["Min"]}}</td>
                        <td>{{result["deviance.resid"]["1Q"]}}</td>
                        <td>{{result["deviance.resid"]["Median"]}}</td>
                        <td>{{result["deviance.resid"]["3Q"]}}</td>
                        <td>{{result["deviance.resid"]["Max"]}}</td>
                    </tr>
                </table>
                <b>Null deviance:&nbsp;</b>{{result["Null deviance"]}}
                <br>
                <b>Residual deviance:&nbsp;</b>{{result["Residual deviance"]}}
                <br>
                <b>AIC:&nbsp;</b>{{result["AIC"]}}
                <br>
                <b>Number of Fisher Scoring iterations:&nbsp;</b>{{result["iter"]}}
            </div>
        </div>
        <!-- 相关性的结果展示 -->
        <div v-else-if="method=='Correlation'">
            <div><b>相关系数可视化:</b></div>
            <div><img :src="result['covPic']" alt="相关系数图"></div>
            <div v-if="name!='statu'&&name!='covPic'" v-for="(value,name) in result">
                <b v-if="name=='cov'">协方差&nbsp;Covariance:</b>
                <b v-else>{{name}}&nbsp;相关系数:</b>
                <table class="table table-striped" style="background:rgb(235,235,235);">
                    <tr>
                        <td></td>
                        <td v-for="item in variables">{{item.head}}</td>
                    </tr>
                    <tr v-for="item in variables">
                        <td>{{item.head}}</td>
                        <td v-for="num in value[item.head]">{{num}}</td>
                    </tr>
                </table>
            </div>
        </div>
        <!-- 贝叶斯相关性的结果展示 -->
        <div v-else-if="method=='BayesCorrelation'">
            <div><b>Pearson'r:</b></div>
            <table class="table table-striped" style="background:rgb(235,235,235);">
                <tr>
                    <td></td>
                    <td v-for="item in variables">{{item.head}}</td>
                </tr>
                <tr v-for="item in variables">
                    <td>{{item.head}}</td>
                    <td v-for="num in result['pearson'][item.head]">{{num}}</td>
                </tr>
            </table>
            <div><b>BF(rscale=1):</b></div>
            <table class="table table-striped" style="background:rgb(235,235,235);">
                <tr>
                    <td></td>
                    <td v-for="item in variables">{{item.head}}</td>
                </tr>
                <tr v-for="item in variables">
                    <td>{{item.head}}</td>
                    <td v-for="num in result['bf1'][item.head]">{{num}}</td>
                </tr>
            </table>
            <div><b>BF(rscale=1/√(3)):</b></div>
            <table class="table table-striped" style="background:rgb(235,235,235);">
                <tr>
                    <td></td>
                    <td v-for="item in variables">{{item.head}}</td>
                </tr>
                <tr v-for="item in variables">
                    <td>{{item.head}}</td>
                    <td v-for="num in result['bf2'][item.head]">{{num}}</td>
                </tr>
            </table>
            <div><b>BF(rscale=1/3):</b></div>
            <table class="table table-striped" style="background:rgb(235,235,235);">
                <tr>
                    <td></td>
                    <td v-for="item in variables">{{item.head}}</td>
                </tr>
                <tr v-for="item in variables">
                    <td>{{item.head}}</td>
                    <td v-for="num in result['bf3'][item.head]">{{num}}</td>
                </tr>
            </table>
            <div><b>BF(rscale=1/√(27)):</b></div>
            <table class="table table-striped" style="background:rgb(235,235,235);">
                <tr>
                    <td></td>
                    <td v-for="item in variables">{{item.head}}</td>
                </tr>
                <tr v-for="item in variables">
                    <td>{{item.head}}</td>
                    <td v-for="num in result['bf4'][item.head]">{{num}}</td>
                </tr>
            </table>
        </div>
        <!-- 贝叶斯线性回归的结果展示 -->
        <div v-else-if="method=='BayesLinearRegression'">
            <div>
                <b>Coefficients:</b>
                <br>
                <table class="table table-striped" style="background:rgb(235,235,235);">
                    <tr>
                        <td></td>
                        <td>Estimate</td>
                        <td>Std.Error</td>
                        <td>t_value</td>
                        <td>Pr(>|t|)</td>
                    </tr>
                    <tr v-for="(value,key) in result['coefficients']">
                        <td><b>{{key}}</b></td>
                        <td>{{value["Estimate"]}}</td>
                        <td>{{value["Std. Error"]}}</td>
                        <td>{{value["t value"]}}</td>
                        <td>{{value["Pr(>|t|)"]}}</td>
                    </tr>
                </table>
                <b>Deviance Residuals:</b>
                <table class="table table-striped" style="background:rgb(235,235,235);">
                    <tr>
                        <td>Min</td>
                        <td>1Q</td>
                        <td>Median</td>
                        <td>3Q</td>
                        <td>Max</td>
                    </tr>
                    <tr>
                        <td>{{result["deviance.resid"]["Min"]}}</td>
                        <td>{{result["deviance.resid"]["1Q"]}}</td>
                        <td>{{result["deviance.resid"]["Median"]}}</td>
                        <td>{{result["deviance.resid"]["3Q"]}}</td>
                        <td>{{result["deviance.resid"]["Max"]}}</td>
                    </tr>
                </table>
                <b>Null deviance:&nbsp;</b>{{result["Null deviance"]}}
                <br>
                <b>Residual deviance:&nbsp;</b>{{result["Residual deviance"]}}
                <br>
                <b>AIC:&nbsp;</b>{{result["AIC"]}}
                <br>
                <b>Number of Fisher Scoring iterations:&nbsp;</b>{{result["iter"]}}
            </div>
        </div>
        <!-- ----------------------------------------------------------------------------------------------------- -->
        <!-- 描述性统计的结果展示 -->
        <div v-else-if="method=='DescriptiveStatistics'">
            <div><b>Descriptives:</b></div>
            <table class="table table-striped" style="background:rgb(235,235,235);">
                <tr>
                    <td></td>
                    <!-- <td>vars</td> -->
                    <td>数据个数(n)</td>
                    <td>均值(mean)</td>
                    <td>中位数(median)</td>
                    <td>min</td>
                    <td>max</td>
                    <td>标准差(sd)</td>
                </tr>
                <tr v-for="(value,key) in result['baseDescriptives']">
                    <td><b>{{key}}</b></td>
                    <!-- <td>{{value['vars']}}</td> -->
                    <td>{{value['n']}}</td>
                    <td>{{value['mean']}}</td>
                    <td>{{value['median']}}</td>
                    <td>{{value['min']}}</td>
                    <td>{{value['max']}}</td>
                    <td>{{value['sd']}}</td>
                </tr>
            </table>
            <table class="table table-striped" style="background:rgb(235,235,235);">
                <tr>
                    <td></td>
                    <td>截尾均值(trimmed)</td>
                    <td>绝对中位差(mad)</td>
                    <td>值域(range)</td>
                    <td>偏度(skew)</td>
                    <td>峰度(kurtosis)</td>
                </tr>
                <tr v-for="(value,key) in result['baseDescriptives']">
                    <td><b>{{key}}</b></td>
                    <td>{{value['trimmed']}}</td>
                    <td>{{value['mad']}}</td>
                    <td>{{value['range']}}</td>
                    <td>{{value['skew']}}</td>
                    <td>{{value['kurtosis']}}</td>
                </tr>
            </table>
            <div><b>直方图-密度曲线:</b></div>
            <div v-for="url in result['pics']">
                <img :src="url" alt="直方图">
            </div>
        </div>
        <!-- 可靠性分析的结果展示 -->
        <div v-else-if="method=='ReliabilityAnalysis'">
            <div><b>alpha:</b></div>
            <table class="table table-striped" style="background:rgb(235,235,235);">
                <tr>
                    <td>raw_alpha</td>
                    <td>std.alpha</td>
                    <td>G6(smc)</td>
                    <td>average_r</td>
                </tr>
                <tr>
                    <td>{{result['total']['raw_alpha']}}</td>
                    <td>{{result['total']['std.alpha']}}</td>
                    <td>{{result['total']['G6(smc)']}}</td>
                    <td>{{result['total']['average_r']}}</td>
                </tr>
            </table>
            <table class="table table-striped" style="background:rgb(235,235,235);">
                <tr>
                    <td>S/N</td>
                    <td>ase</td>
                    <td>mean</td>
                    <td>sd</td>
                    <td>median_r</td>
                </tr>
                <tr>
                    <td>{{result['total']['S/N']}}</td>
                    <td>{{result['total']['ase']}}</td>
                    <td>{{result['total']['mean']}}</td>
                    <td>{{result['total']['sd']}}</td>
                    <td>{{result['total']['median_r']}}</td>
                </tr>
            </table>

            <div><b>Reliability if an item is dropped:</b></div>
            <table class="table table-striped" style="background:rgb(235,235,235);">
                <tr>
                    <td></td>
                    <td>raw_alpha</td>
                    <td>std.alpha</td>
                    <td>G6(smc)</td>
                    <td>average_r</td>
                    <td>S/N</td>
                    <td>alpha_se</td>
                    <td>var.r</td>
                    <td>med.r</td>
                </tr>
                <tr v-for="(value,key) in result['drop']">
                    <td>{{key}}</td>
                    <td>{{value['raw_alpha']}}</td>
                    <td>{{value['std.alpha']}}</td>
                    <td>{{value['G6(smc)']}}</td>
                    <td>{{value['average_r']}}</td>
                    <td>{{value['S/N']}}</td>
                    <td>{{value['alpha se']}}</td>
                    <td>{{value['var.r']}}</td>
                    <td>{{value['med.r']}}</td>
                </tr>
            </table>

            <div><b>Item statistics:</b></div>
            <table class="table table-striped" style="background:rgb(235,235,235);">
                <tr>
                    <td></td>
                    <td>n</td>
                    <td>raw.r</td>
                    <td>std.r</td>
                    <td>r.cor</td>
                    <td>r.drop</td>
                    <td>mean</td>
                    <td>sd</td>
                </tr>
                <tr v-for="(value,key) in result['stats']">
                    <td>{{key}}</td>
                    <td>{{value['n']}}</td>
                    <td>{{value['raw.r']}}</td>
                    <td>{{value['std.r']}}</td>
                    <td>{{value['r.cor']}}</td>
                    <td>{{value['r.drop']}}</td>
                    <td>{{value['mean']}}</td>
                    <td>{{value['sd']}}</td>
                </tr>
            </table>
        </div>
        <!-- ----------------------------------------------------------------------------------------------------- -->
        <!-- 独立样本T检验的结果 -->
        <div v-else-if="method=='IndependentSamplesT-Test'">
            <div><b>result:</b></div>
            <table class="table table-striped" style="background:rgb(235,235,235);">
                <tr>
                    <td></td>
                    <td>t</td>
                    <td>df</td>
                    <td>p-value</td>
                </tr>
                <tr v-if="key!='statu'" v-for="(value,key) in result">
                    <td>{{key}}</td>
                    <td>{{value['statistic']}}</td>
                    <td>{{value['parameter']}}</td>
                    <td>{{value['p.value']}}</td>
                </tr>
            </table>
            <table class="table table-striped" style="background:rgb(235,235,235);">
                <tr>
                    <td></td>
                    <td>95%置信区间(95% confidence interval)</td>
                </tr>
                <tr v-if="key!='statu'" v-for="(value,key) in result">
                    <td>{{key}}</td>
                    <td>{{value['interval']}}</td>
                </tr>
            </table>
        </div>
        <!-- 配对样本T检验的结果 -->
        <div v-else-if="method=='PairedSamplesT-Test'">
            <div><b>result:</b></div>
            <table class="table table-striped" style="background:rgb(235,235,235);">
                <tr>
                    <td></td>
                    <td>t</td>
                    <td>df</td>
                    <td>p-value</td>
                </tr>
                <tr v-if="key!='statu'" v-for="(value,key) in result">
                    <td>{{key}}</td>
                    <td>{{value['statistic']}}</td>
                    <td>{{value['parameter']}}</td>
                    <td>{{value['p.value']}}</td>
                </tr>
            </table>
            <table class="table table-striped" style="background:rgb(235,235,235);">
                <tr>
                    <td></td>
                    <td>95%置信区间(95% confidence interval)</td>
                </tr>
                <tr v-if="key!='statu'" v-for="(value,key) in result">
                    <td>{{key}}</td>
                    <td>{{value['interval']}}</td>
                </tr>
            </table>
        </div>
        <!-- 单个样本T检验的结果 -->
        <div v-else-if="method=='OneSampleT-Test'">
            <div><b>result:</b></div>
            <table class="table table-striped" style="background:rgb(235,235,235);">
                <tr>
                    <td></td>
                    <td>t</td>
                    <td>df</td>
                    <td>p-value</td>
                </tr>
                <tr v-if="key!='statu'" v-for="(value,key) in result">
                    <td>{{key}}</td>
                    <td>{{value['statistic']}}</td>
                    <td>{{value['parameter']}}</td>
                    <td>{{value['p.value']}}</td>
                </tr>
            </table>
            <table class="table table-striped" style="background:rgb(235,235,235);">
                <tr>
                    <td></td>
                    <td>95%置信区间(95% confidence interval)</td>
                </tr>
                <tr v-if="key!='statu'" v-for="(value,key) in result">
                    <td>{{key}}</td>
                    <td>{{value['interval']}}</td>
                </tr>
            </table>
        </div>
        <!-- 贝叶斯独立样本T检验的结果 -->
        <div v-else-if="method=='BayesIndependentSamplesT-Test'">
            <div><b>result:</b></div>
            <table class="table table-striped" style="background:rgb(235,235,235);">
                <tr>
                    <td></td>
                    <td>bf</td>
                    <td>error</td>
                </tr>
                <tr v-if="key!='statu'" v-for="(value,key) in result">
                    <td>{{key}}</td>
                    <td>{{value['bf']}}</td>
                    <td>{{value['error']}}</td>
                </tr>
            </table>
        </div>
        <!-- 贝叶斯配对样本T检验的结果 -->
        <div v-else-if="method=='BayesPairedSamplesT-Test'">
            <div><b>result:</b></div>
            <table class="table table-striped" style="background:rgb(235,235,235);">
                <tr>
                    <td></td>
                    <td>bf</td>
                    <td>error</td>
                </tr>
                <tr v-if="key!='statu'" v-for="(value,key) in result">
                    <td>{{key}}</td>
                    <td>{{value['bf']}}</td>
                    <td>{{value['error']}}</td>
                </tr>
            </table>
        </div>
        <!-- 贝叶斯单个样本T检验的结果 -->
        <div v-else-if="method=='BayesOneSampleT-Test'">
            <div><b>result:</b></div>
            <table class="table table-striped" style="background:rgb(235,235,235);">
                <tr>
                    <td></td>
                    <td>bf</td>
                    <td>error</td>
                </tr>
                <tr v-if="key!='statu'" v-for="(value,key) in result">
                    <td>{{key}}</td>
                    <td>{{value['bf']}}</td>
                    <td>{{value['error']}}</td>
                </tr>
            </table>
        </div>
        <!-- ----------------------------------------------------------------------------------------------------- -->
        <!-- 方差分析的结果 -->
        <div v-else-if="method=='ANOVA'">
            <div><b>result:</b></div>
            <table class="table table-striped" style="background:rgb(235,235,235);">
                <tr>
                    <td></td>
                    <td>Df</td>
                    <td>总方差和(Sum Sq)</td>
                    <td>平均方差和(Mean Sq)</td>
                    <td>F统计量(F value)</td>
                    <td>P值(Pr(>F))</td>
                </tr>
                <tr v-for="(value,key) in result['anova']">
                    <td>{{key}}</td>
                    <td>{{value['Df']}}</td>
                    <td>{{value['Sum Sq']}}</td>
                    <td>{{value['Mean Sq']}}</td>
                    <td>{{value['F value']}}</td>
                    <td>{{value['Pr(>F)']}}</td>
                </tr>
            </table>
        </div>
        <!-- 协方差分析的结果 -->
        <div v-else-if="method=='ANCOVA'">
            <div><b>result:</b></div>
            <table class="table table-striped" style="background:rgb(235,235,235);">
                <tr>
                    <td></td>
                    <td>Df</td>
                    <td>总方差和(Sum Sq)</td>
                    <td>平均方差和(Mean Sq)</td>
                    <td>F统计量(F value)</td>
                    <td>P值(Pr(>F))</td>
                </tr>
                <tr v-for="(value,key) in result['ancova']">
                    <td>{{key}}</td>
                    <td>{{value['Df']}}</td>
                    <td>{{value['Sum Sq']}}</td>
                    <td>{{value['Mean Sq']}}</td>
                    <td>{{value['F value']}}</td>
                    <td>{{value['Pr(>F)']}}</td>
                </tr>
            </table>
        </div>
        <!-- 多变量方差分析的结果 -->
        <div v-else-if="method=='MANOVA'">
            <div><b>result:</b></div>
            <table class="table table-striped" style="background:rgb(235,235,235);">
                <tr>
                    <td></td>
                    <td>Df</td>
                    <td>den Df</td>
                    <td>approx F</td>
                    <td>Pr(>F)</td>
                    <td>num Df</td>
                    <td>Pillai</td>
                </tr>
                <tr v-for="(value,key) in result['manova']">
                    <td>{{key}}</td>
                    <td>{{value['Df']}}</td>
                    <td>{{value['den Df']}}</td>
                    <td>{{value['approx F']}}</td>
                    <td>{{value['Pr(>F)']}}</td>
                    <td>{{value['num Df']}}</td>
                    <td>{{value['Pillai']}}</td>
                </tr>
            </table>
        </div>
        <!-- ----------------------------------------------------------------------------------------------------- -->
        <!-- 二项检验的结果 -->
        <div v-else-if="method=='BinomialTest'">
            <div v-if="key!='statu'" v-for="(value,key) in result">
                <div><b>变量<span style="color:green;">{{key}}</span>的结果
                    (variable <span style="color:green;">{{key}}</span> result):
                </b></div>
                <table class="table table-striped" style="background:rgb(235,235,235);">
                    <tr>
                        <td>Level</td>
                        <td>Counts</td>
                        <td>Total</td>
                        <td>Proportion</td>
                        <td>P-value</td>
                        <td>95%置信区间</td>
                    </tr>
                    <tr v-for="(data,name) in value">
                        <td>{{name}}</td>
                        <td>{{data['counts']}}</td>
                        <td>{{data['total']}}</td>
                        <td>{{data['proportion']}}</td>
                        <td>{{data['p-value']}}</td>
                        <td>{{data['interval']}}</td>
                    </tr>
                </table>
            </div>
            
        </div>
        <!-- 对数线性回归的结果展示 -->
        <div v-else-if="method=='Log-LinearRegression'">
            <div>
                <div><b>ANOVA:</b></div>
                <table class="table table-striped" style="background:rgb(235,235,235);">
                    <tr>
                        <td></td>
                        <td>Df</td>
                        <td>总方差和(Sum Sq)</td>
                        <td>平均方差和(Mean Sq)</td>
                        <td>F统计量(F value)</td>
                        <td>P值(Pr(>F))</td>
                    </tr>
                    <tr v-for="(value,key) in result['anova']">
                        <td>{{key}}</td>
                        <td>{{value['Df']}}</td>
                        <td>{{value['Sum Sq']}}</td>
                        <td>{{value['Mean Sq']}}</td>
                        <td>{{value['F value']}}</td>
                        <td>{{value['Pr(>F)']}}</td>
                    </tr>
                </table>
                <b>Coefficients:</b>
                <br>
                <table class="table table-striped" style="background:rgb(235,235,235);">
                    <tr>
                        <td></td>
                        <td>Estimate</td>
                        <td>Std.Error</td>
                        <td>z_value</td>
                        <td>Pr(>|z|)</td>
                    </tr>
                    <tr v-for="(value,key) in result['coefficients']">
                        <td><b>{{key}}</b></td>
                        <td>{{value["Estimate"]}}</td>
                        <td>{{value["Std. Error"]}}</td>
                        <td>{{value["z value"]}}</td>
                        <td>{{value["Pr(>|z|)"]}}</td>
                    </tr>
                </table>
                <b>Deviance Residuals:</b>
                <table class="table table-striped" style="background:rgb(235,235,235);">
                    <tr>
                        <td>Min</td>
                        <td>1Q</td>
                        <td>Median</td>
                        <td>3Q</td>
                        <td>Max</td>
                    </tr>
                    <tr>
                        <td>{{result["deviance.resid"]["Min"]}}</td>
                        <td>{{result["deviance.resid"]["1Q"]}}</td>
                        <td>{{result["deviance.resid"]["Median"]}}</td>
                        <td>{{result["deviance.resid"]["3Q"]}}</td>
                        <td>{{result["deviance.resid"]["Max"]}}</td>
                    </tr>
                </table>
                <b>Null deviance:&nbsp;</b>{{result["Null deviance"]}}
                <br>
                <b>Residual deviance:&nbsp;</b>{{result["Residual deviance"]}}
                <br>
                <b>AIC:&nbsp;</b>{{result["AIC"]}}
                <br>
                <b>Number of Fisher Scoring iterations:&nbsp;</b>{{result["iter"]}}
            </div>
        </div>
        <!-- 列联表的结果 -->
        <div v-else-if="method=='ContingencyTables'">
            <div><b>table:</b></div>
            <table class="table table-striped" style="background:rgb(235,235,235);">
                <tr>
                    <td><b>{{row_var.head}}</b>&nbsp;\&nbsp;<b>{{col_var.head}}</b></td>
                    <td v-for="name in result['frequency'][col_var.head]">
                        {{name}}
                    </td>
                    <td>Total</td>
                </tr>
                <tr v-for="(value,key) in result['frequency'][row_var.head]">
                    <td>{{key}}</td>
                    <td v-for="num in value">
                        {{num}}
                    </td>
                </tr>
            </table>
            <div><b>Pearson's Chi-squared test:</b></div>
            <table class="table table-striped" style="background:rgb(235,235,235);">
                <tr>
                    <td>Chi^2</td>
                    <td>d.f.</td>
                    <td>p-value</td>
                </tr>
                <tr>
                    <td>{{result['chiSquared']['Chi^2']}}</td>
                    <td>{{result['chiSquared']['d.f.']}}</td>
                    <td>{{result['chiSquared']['p_value']}}</td>
                </tr>
            </table>
        </div>
        <!-- 贝叶斯列联表的结果 -->
        <div v-else-if="method=='BayesContingencyTables'">
            <div><b>Contingency Table:</b></div>
            <table class="table table-striped" style="background:rgb(235,235,235);">
                <tr>
                    <td><b>{{row_var.head}}</b>&nbsp;\&nbsp;<b>{{col_var.head}}</b></td>
                    <td v-for="name in result['frequency'][col_var.head]">
                        {{name}}
                    </td>
                    <td>Total</td>
                </tr>
                <tr v-for="(value,key) in result['frequency'][row_var.head]">
                    <td>{{key}}</td>
                    <td v-for="num in value">
                        {{num}}
                    </td>
                </tr>
            </table>
            <div><b>Bayesian Contingency Table Tests:</b></div>
            <table class="table table-striped" style="background:rgb(235,235,235);">
                <tr>
                    <td>bf</td>
                    <td>error</td>
                </tr>
                <tr>
                    <td>{{result['bf']}}</td>
                    <td>{{result['error']}}</td>
                </tr>
            </table>
        </div>
        <!-- ----------------------------------------------------------------------------------------------------- -->
        <!-- 主成分分析的结果 -->
        <div v-else-if="method=='PrincipalComponentAnalysis'">
            <div><b>平行分析碎石图:</b></div>
            <div><img :src="result['parallelPic']" alt="平行分析碎石图"></div>
            <div><b>Importance of components:</b></div>
            <table class="table table-striped" style="background:rgb(235,235,235);">
                <tr>
                    <td></td>
                    <td v-for="name in result['importance']['cnames']">
                        {{name}}
                    </td>
                </tr>
                <tr>
                    <td>标准差(Standard deviation)</td>
                    <td v-for="value in result['importance']['sdev']">
                        {{value}}
                    </td>
                </tr>
                <tr>
                    <td>方差贡献率(Proportion of Variance)</td>
                    <td v-for="value in result['importance']['pov']">
                        {{value}}
                    </td>
                </tr>
                <tr>
                    <td>累计方差贡献率(Cumulative Proportion)</td>
                    <td v-for="value in result['importance']['cp']">
                        {{value}}
                    </td>
                </tr>
            </table>
            <div><b>Loadings:</b></div>
            <table class="table table-striped" style="background:rgb(235,235,235);">
                <tr>
                    <td></td>
                    <td v-for="name in result['importance']['cnames']">{{name}}</td>
                </tr>
                <tr v-for="(value,key) in result['importance']['loadings']">
                    <td>{{key}}</td>
                    <td v-for="val in value">{{val}}</td>
                </tr>
            </table>
        </div>
        <!-- 探索性因子分析的结果 -->
        <div v-else-if="method=='ExploratoryFactorAnalysis'">
            <div><b>平行分析碎石图:</b></div>
            <div><img :src="result['parallelPic']" alt="平行分析碎石图"></div>
            <div><b>Loadings:</b></div>
            <table class="table table-striped" style="background:rgb(235,235,235);">
                <tr>
                    <td></td>
                    <td v-for="name in result['loadings']['loadingNames']">{{name}}</td>
                </tr>
                <tr v-if="key!='loadingNames'" v-for="(value,key) in result['loadings']">
                    <td>{{key}}</td>
                    <td v-for="lname in result['loadings']['loadingNames']">{{value[lname]}}</td>
                </tr>
            </table>
            <table class="table table-striped" style="background:rgb(235,235,235);">
                <tr>
                    <td></td>
                    <td v-for="name in result['unknow']['unknowNames']">{{name}}</td>
                </tr>
                <tr v-if="key!='unknowNames'" v-for="(value,key) in result['unknow']">
                    <td>{{key}}</td>
                    <td v-for="uname in result['unknow']['unknowNames']">{{value[uname]}}</td>
                </tr>
            </table>
        </div>
    </div>
</template>
<script>
export default {
    name:'showResult',
    props:["result","method","covariates","variables","row_var","col_var"],
    components:{

    },
    data(){
        return{

        }
    }
}
</script>
<style>
    hr{
        margin: 5px;
    }
    /* .pic-div{
        w
    } */
</style>