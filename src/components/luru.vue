<template>
    <div class="luru">
      <van-icon style="position:absolute;top:4px;right:4px;" color="#ffffff" name="close" size="28px" @click="closebig" />
      <van-popup
        v-model="showmaterial"
        position="right"
        :style="{ width: '100%',height:'100%' }">
        <div class="material-content">
          <div class="header-box">
            <van-icon name="arrow-left" @click="showmaterial=false" size="28" />
            <van-field ref="focusa" style="flex:1;padding:4px 10px;margin:0 6px"  left-icon="search" clearable v-model="materialin" @input="getRemark()" placeholder="请输入搜索关键词" />
            <span class="searchfone" @click="submit(materialin)">确定</span>
          </div>
          <div class="content-box">
            <div class="content-item" v-for="(item,index) in materialData" :key="index" v-html="item.name" @click="submit(item.name)"></div>
            <div v-if='loadmaterial' class="conme" style="width:100%;height:100%;text-align:center"><van-loading type="spinner" color="#1989fa" /></div>
            <!-- <div v-if='materialData.length==0' class="conme" style="width:100%;height:100%;font-size:18px;color:#666666;text-align:center">暂无数据~</div> -->
          </div>
        </div>
      </van-popup>
      <!-- 防止过快的切换 -->
    <van-overlay :z-index="30" :show="showimg">
      <div class="wrapperfast" >
        <van-loading size="64px" color="#1989fa"></van-loading>
      </div>
    </van-overlay>
    <van-dialog v-model="showresult" title="提交成功" @confirm="closebig">
      <div>我们将尽快与您联系<br>审核通过后，平台可见</div>
    </van-dialog>
    <!-- 防止过快的切换 -->
      <div class="reduce-content">
        <div  class="banner" :style="{'background-image':bannerback}"></div>
        <div class="us-need-wrapper">
          <div class="us-need need">
            <div class="tab-btn">
              <span :class="curTabIndex==item.type?'active':''" v-for="(item,i) in luruSelectData" :key="item.type+'tab'" @click="needTi(item.type)">{{item.name}}</span>
            </div>
            <div class="form-wrapper" v-if="curTabIndex==1">
              <div class="form-input">
                <span><img style="" src="../assets/image/star.png" alt="">名称</span>
                <van-field v-model="form1.hispotalName" type="text" @input="searchSaming(form1.hispotalName,1)" placeholder="请填写" :error-message="errorMessage1.hispotalName"/>
              </div>
              <div class="form-input">
                <span><img style="" src="../assets/image/star.png" alt="">所在地区</span>
                <van-field v-model="form1.address" type="text" readonly placeholder="省市" :error-message="errorMessage1.address" @click="showPicker = true"/>
                <van-popup v-model="showPicker" position="bottom">
                    <van-picker show-toolbar  :columns="columns" @cancel="onCancel" @confirm="onConfirm" @change="onChange" />
                </van-popup>
              </div>
              <div class="form-input">
                <span><img style="" src="../assets/image/star.png" alt="">详细地址(门牌号)</span>
                <van-field v-model="form1.addressDetail" type="text" placeholder="街道、门牌号等" :error-message="errorMessage1.addressDetail"/>
              </div>
              <div class="form-input">
                <span><img style="" src="../assets/image/star.png" alt="">类型</span>
                <div class="comfirm-radio">
                  <van-radio-group v-model="form1.type" class="radio-group">
                    <div class="sig-radio" v-for="(item,i) in luruTypeRadio" :key="i+item.name">

                    <van-radio :name="item.id" checked-color="#2D65E3" :label="item.name" @click="secectRadio(item.id)">{{item.name}}</van-radio>
                    </div>
                  </van-radio-group>
                </div>
              </div>
              <div class="form-input">
                <span><img style="" src="../assets/image/star.png" alt="">物资对接情况</span>
                <div class="comfirm-radio">
                  <van-checkbox-group v-model="form1.sup" class="radio-group">
                    <div class="sig-radio" v-for="(item,i) in luruSupRadio" :key="i+item.name">
                    <van-checkbox shape="square" checked-color="#2D65E3" :name="item.id">{{item.name}}</van-checkbox>
                    </div>
                  </van-checkbox-group>
                </div>
              </div>
              <div class="form-input">
                <span><img style="" src="../assets/image/star.png" alt="">需求表</span>
                <div class="comfirm-need-input-wrapper">
                  <div class="comfirm-need-top">

                    <div class="comfirm-need-head">
                      <div class="name">物资名称</div>
                      <div class="num">需求数量</div>
                    </div>
                    <div class="comfirm-need-body" v-for="(iteam,index) in form1.materialDetails" :key="index">
                      <div class="name">
                        <!-- <van-field class="sup-name" v-model="iteam.needsName" type="text" placeholder="输入物资名称"   input-align="center"/> -->

                        <van-field class="sup-name" :readonly="readonly1" v-model="iteam.needsName" type="text" placeholder="输入物资名称"   input-align="center" @focus="needFocus(index)" @blur="needBlur(index)"/>
                        <van-popup v-model="startTimePopNeedName" position="bottom">
                        <van-picker show-toolbar :columns="needList" @confirm="confirmNeedName" @cancel="cancleNeedName" @change="changeNeedName" />
                        </van-popup>
                      </div>
                      <div class="num"><van-field class="sup-num" v-model="iteam.needsNum" type="number" placeholder="请输入数字" testnum input-align="center" /><img @click="deleteDemand(index)" style="" src="../assets/image/reduce1.png" alt=""></div>
                    </div>
                  </div>
                  <div class="comfirm-need-bottom" @click="addDemand"><img style="" src="../assets/image/add1.png" alt="" >添加</div>
                </div>
                <span class="desc need-table-desc">数量填写可便于物资调配，如不确定数量可不填写</span>
              </div>
              <div class="form-input">
                <span><img style="" src="../assets/image/star.png" alt="">联系人-联系方式</span>
                <div class="comfirm-need-input-wrapper">
                  <div class="comfirm-need-top comfirm-need-top-tel">

                    <div class="comfirm-need-head">
                      <div class="name">联系人</div>
                      <div class="num">联系方式</div>
                    </div>
                    <div class="comfirm-need-body" v-for="(iteam,index) in form1.contectTelList" :key="index">
                      <div class="name">
                        <!-- <van-field class="sup-name" v-model="iteam.needsName" type="text" placeholder="输入物资名称"   input-align="center"/> -->

                        <van-field class="sup-name" v-model="iteam.name" type="text" placeholder="输入联系人"   input-align="center"/>
                      </div>
                      <div class="num"><van-field class="tel" v-model="iteam.tel" type="text" placeholder="输入电话号码(建议手机)" @blur="linkTelBlur(1,iteam.tel,index)"/><img @click="deleteTel(index)" style="" src="../assets/image/reduce1.png" alt=""></div>
                    </div>
                  </div>
                  <div class="comfirm-need-bottom" @click="addTel"><img style="" src="../assets/image/add1.png" alt="" >添加</div>
                </div>
              </div>
              <!-- <div class="form-input">
                <span><img style="" src="../assets/image/star.png" alt="">联系人-联系方式</span>
                <div class="comfirm-input-wrapper">
                  <div class="comfirm-input" v-for="(item,i) in form1.contectTelList" :key="i">
                    <van-field class="contect" v-model="item.name" type="text" placeholder="输入联系人" />-
                    <van-field class="tel" v-model="item.tel" type="text" placeholder="输入电话号码(建议手机)" @blur="linkTelBlur(1,item.tel,i)"/>
                    
                  </div>
                </div>
              </div> -->
              <div class="form-input">
                <span><img style="" src="../assets/image/star.png" alt="">需求发布时间</span>
                <van-field v-model="form1.startTime" placeholder="选择时间" readonly @click="startTimePop = true"/>
                <van-popup v-model="startTimePop" position="bottom">
                  <van-datetime-picker
                    v-model="currentDate"
                    type="date"
                    :min-date="minDate"
                    @confirm="confirmTime"
                    @cancel="cancelTime"
                    :formatter="formatter"
                  />
                </van-popup>
              </div>
              <div class="form-input">
                <span><img style="" src="../assets/image/star.png" alt="">需求来源</span>
                <div class="comfirm-radio">
                  <van-radio-group v-model="form1.needOrgin" class="radio-group">
                    <div class="sig-radio" v-for="(item,i) in luruSourceRadio" :key="i+item.name">
                    <van-radio :name="item.id" checked-color="#2D65E3">{{item.name}}</van-radio>
                    </div>
                  </van-radio-group>
                </div>
              </div>
              <div class="form-input">
                <span>其他说明</span>
                <van-field v-model="form1.needsDescr" type="textarea" placeholder="备注"/>
              </div>
              <div class="form-input">
                <span><img style="" src="../assets/image/star.png" alt="">需求证明</span>
                <div class="need-img-wrapper">
                  <van-uploader
                    v-model="form1.fileList"
                    multiple
                    :after-read="xuRead" 
                    @delete="xudelete"
                    :max-count="5"
                  />
                </div>
                  <span class="desc">请上传需求公函照片或官网文件截图，最多可上传5张。</span>
              </div>
              <div class="confirm-btn" @click="confirmone">提交</div>
            </div>
            <div class="form-wrapper" v-if="curTabIndex==2">
              <div class="form-input">
                <span><img style="" src="../assets/image/star.png" alt="">提供方名称</span>
                <van-field v-model="form2.hispotalName" @input="searchSaming(form2.hispotalName,2)" type="text" placeholder="请填写" :error-message="errorMessage2.hispotalName"/>
              </div>
              <div class="form-input">
                <span><img style="" src="../assets/image/star.png" alt="">所在地区</span>
                <van-field v-model="form2.address" type="text" readonly placeholder="省市" :error-message="errorMessage2.address" @click="showPicker1 = true"/>
                <van-popup v-model="showPicker1" position="bottom">
                    <van-picker show-toolbar :columns="columns" @cancel="onCancel1" @confirm="onConfirm1" @change="onChange1" />
                </van-popup>
              </div>
              <div class="form-input">
                <span><img style="" src="../assets/image/star.png" alt="">详细地址(门牌号)</span>
                <van-field v-model="form2.addressDetail" type="text" placeholder="街道、门牌号等" :error-message="errorMessage2.addressDetail"/>
              </div>
              <div class="form-input">
                <span><img style="" src="../assets/image/star.png" alt="">类型</span>
                <div class="comfirm-radio">
                  <van-radio-group v-model="form2.type" class="radio-group">
                    <div class="sig-radio" v-for="(item,i) in luruTypeRadio1" :key="i+item.name">

                    <van-radio :name="item.id" checked-color="#2D65E3">{{item.name}}</van-radio>
                    </div>
                  </van-radio-group>
                </div>
              </div>
              <div class="form-input">
                <span><img style="" src="../assets/image/star.png" alt="">物资提供方式</span>
                <div class="comfirm-radio">
                  <van-radio-group v-model="form2.sup" class="radio-group">
                    <div class="sig-radio" v-for="(item,i) in luruSupRadio1" :key="i+item.name">
                    <van-radio :name="item.id" checked-color="#2D65E3">{{item.name}}</van-radio>
                    </div>
                  </van-radio-group>
                </div>
              </div>
              <div class="form-input">
                <span><img style="" src="../assets/image/star.png" alt="">是否需要物流</span>
                <div class="comfirm-radio">
                  <van-radio-group v-model="form2.sup1" class="radio-group">
                    <div class="sig-radio" v-for="(item,i) in luruneedRadio" :key="i+item.name">
                    <van-radio :name="item.id" checked-color="#2D65E3">{{item.name}}</van-radio>
                    </div>
                  </van-radio-group>
                </div>
              </div>
              <div class="form-input">
                <span><img style="" src="../assets/image/star.png" alt="">可提供物资清单</span>
                <div class="comfirm-need-input-wrapper">
                  <div class="comfirm-need-top">

                    <div class="comfirm-need-head">
                      <div class="name">物资名称</div>
                      <div class="num">可提供数量</div>
                    </div>
                    <div class="comfirm-need-body" v-for="(iteam,index) in form2.materialDetails" :key="index">
                      <div class="name">
                        <!-- <van-field class="sup-name" v-model="iteam.needsName" type="text" placeholder="输入物资名称"   input-align="center"/> -->

                        
                        <van-field class="sup-name" v-model="iteam.needsName" :readonly="readonly2" type="text" placeholder="输入物资名称"   input-align="center"  @focus="needFocus1(index)" @blur="needBlur1(index)"/>
                        <van-popup v-model="startTimePopNeedName" position="bottom">
                        <van-picker show-toolbar :columns="needList" @confirm="confirmNeedName1" @cancel="cancleNeedName" @change="changeNeedName1" />
                        </van-popup>
                      </div>
                      <div class="num"><van-field class="sup-num" v-model="iteam.needsNum" type="number" placeholder="请输入数字" testnum input-align="center" /><img @click="deleteDemand1(index)" style="" src="../assets/image/reduce1.png" alt=""></div>
                    </div>
                  </div>
                  <div class="comfirm-need-bottom" @click="addDemand1"><img style="" src="../assets/image/add1.png" alt="" >添加</div>
                </div>
              </div>
              <div class="form-input">
                <span><img style="" src="../assets/image/star.png" alt="">联系人-联系方式</span>
                <div class="comfirm-need-input-wrapper">
                  <div class="comfirm-need-top comfirm-need-top-tel">

                    <div class="comfirm-need-head">
                      <div class="name">联系人</div>
                      <div class="num">联系方式</div>
                    </div>
                    <div class="comfirm-need-body" v-for="(iteam,index) in form2.contectTelList" :key="index">
                      <div class="name">
                        <!-- <van-field class="sup-name" v-model="iteam.needsName" type="text" placeholder="输入物资名称"   input-align="center"/> -->

                        <van-field class="sup-name" v-model="iteam.name" type="text" placeholder="输入联系人"   input-align="center"/>
                      </div>
                      <div class="num"><van-field class="tel" v-model="iteam.tel" type="text" placeholder="输入电话号码(建议手机)"  @blur="linkTelBlur(2,iteam.tel,index)"/><img @click="deleteTel1(index)" style="" src="../assets/image/reduce1.png" alt=""></div>
                    </div>
                  </div>
                  <div class="comfirm-need-bottom" @click="addTel1"><img style="" src="../assets/image/add1.png" alt="" >添加</div>
                </div>
              </div>
              <!-- <div class="form-input">
                <span><img style="" src="../assets/image/star.png" alt="">联系人-联系方式</span>
                <div class="comfirm-input-wrapper">
                  <div class="comfirm-input" v-for="(item,i) in form2.contectTelList" :key="i">
                    <van-field class="contect" v-model="item.name" type="text" placeholder="输入联系人" />-
                    <van-field class="tel" v-model="item.tel" type="text" placeholder="输入电话号码(建议手机)"  @blur="linkTelBlur(2,item.tel,i)"/>
                    
                  </div>
                </div>
              </div> -->
              <div class="form-input">
                <span><img style="" src="../assets/image/star.png" alt="">物资提供时间</span>
                <van-field v-model="form2.startTime" placeholder="选择时间" readonly @click="startTimePopNeed = true"/>
                <van-popup v-model="startTimePopNeed" position="bottom">
                  <van-datetime-picker
                    v-model="currentDateNeed"
                    type="date"
                    :min-date="minDate"
                    @confirm="confirmTimeNeed"
                    @cancel="cancelTimeNeed"
                    :formatter="formatter"
                  />
                </van-popup>
              </div>
              <div class="form-input">
                <span>其他说明</span>
                <van-field v-model="form2.needsDescr" type="textarea" placeholder="备注"/>
              </div>
              <div class="form-input">
                <span><img style="" src="../assets/image/star.png" alt="">身份证明</span>
                <div class="need-img-wrapper">
                  <van-uploader
                    v-model="form2.fileList"
                    multiple
                    :after-read="tiRead" 
                    @delete="tidelete"
                    :max-count="2"
                  />
                </div>
                  <span class="desc">企业提供方请上传营业执照照片，个人提供方请上传身份证正反面照片，最多可上传2张照片</span>
              </div>
              <div class="confirm-btn" @click="confirmtwo">提交</div>
            </div>
            <div class="form-wrapper" v-if="curTabIndex==3">
              <div class="form-input">
                <span><img style="" src="../assets/image/star.png" alt="">机构名称</span>
                <van-field v-model="form3.name" type="text" @input="searchSaming(form3.name,3)" placeholder="请填写" :error-message="errorMessage3.hispotalName"/>
              </div>
              <div class="form-input">
                <span><img style="" src="../assets/image/star.png" alt="">所在地区</span>
                <van-field v-model="form3.address2" type="text" readonly placeholder="省市" :error-message="errorMessage3.address2" @click="showPicker = true"/>
                <van-popup v-model="showPicker" position="bottom">
                    <van-picker show-toolbar :columns="columns" @cancel="onCancel" @confirm="onConfirm3" @change="onChange" />
                </van-popup>
              </div>
              <div class="form-input">
                <span><img style="" src="../assets/image/star.png" alt="">详细地址(门牌号)</span>
                <van-field v-model="form3.address" type="text" placeholder="街道、门牌号等" :error-message="errorMessage3.address"/>
              </div>
              <div class="form-input">
                <span><img style="" src="../assets/image/star.png" alt="">服务覆盖范围</span>
                <van-field v-model="form3.serviceRange" type="text" placeholder="输入例如：山东全省16个地市" :error-message="errorMessage3.serviceRange"/>
              </div>
              <div class="form-input">
                <span><img style="" src="../assets/image/star.png" alt="">请选择可提供服务的起始日期</span>
                <van-field v-model="form3.startTime" placeholder="选择时间" readonly @click="startTimePop3 = true"/>
                <van-popup v-model="startTimePop3" position="bottom">
                  <van-datetime-picker
                    v-model="currentDate3"
                    type="date"
                    :min-date="minDate"
                    :max-date="maxDate"
                    :formatter="formatter1"
                    @confirm="quemsg"
                    @cancel="startTimePop3 = false"
                  />
                </van-popup>
              </div>
              <div class="form-input">
                <span><img style="" src="../assets/image/star.png" alt="">请选择可提供服务的结束日期</span>
                <van-field v-model="form3.endTime" placeholder="选择时间" readonly @click="startTimePop4 = true"/>
                <van-popup v-model="startTimePop4" position="bottom">
                  <van-datetime-picker
                    v-model="currentDate1"
                    type="date"
                    :min-date="minDate1"
                    @confirm="quemsg2"
                    @cancel="startTimePop4 = false"
                    :formatter="formatter1"
                  />
                </van-popup>
              </div>
              <div class="form-input">
                <span><img style="" src="../assets/image/star.png" alt="">机构类型</span>
                <div class="comfirm-radio">
                  <van-radio-group v-model="form3.type" class="radio-group">
                    <div class="sig-radio" v-for="(item,i) in luruOriginizeTypeRadio" :key="i+item.name">

                    <van-radio :name="item.id" checked-color="#2D65E3">{{item.name}}</van-radio>
                    </div>
                  </van-radio-group>
                </div>
              </div>
              <div class="form-input">
                <span>链接</span>
                <van-field v-model="form3.linkUrl" type="textarea" placeholder="请填写" :error-message="errorMessage3.linkUrl"/>
              </div>
              <div class="form-input">
                <span><img style="" src="../assets/image/star.png" alt="">联系人-联系方式</span>
                <div class="comfirm-need-input-wrapper">
                  <div class="comfirm-need-top comfirm-need-top-tel">

                    <div class="comfirm-need-head">
                      <div class="name">联系人</div>
                      <div class="num">联系方式</div>
                    </div>
                    <div class="comfirm-need-body" v-for="(iteam,index) in form3.contectTelList" :key="index">
                      <div class="name">
                        <!-- <van-field class="sup-name" v-model="iteam.needsName" type="text" placeholder="输入物资名称"   input-align="center"/> -->

                        <van-field class="sup-name" v-model="iteam.name" type="text" placeholder="输入联系人"   input-align="center"/>
                      </div>
                      <div class="num"><van-field class="tel" v-model="iteam.tel" type="text" placeholder="输入电话号码(建议手机)"  @blur="linkTelBlur(3,iteam.tel,index)"/><img @click="deleteTel2(index)" style="" src="../assets/image/reduce1.png" alt=""></div>
                    </div>
                  </div>
                  <div class="comfirm-need-bottom" @click="addTel2"><img style="" src="../assets/image/add1.png" alt="" >添加</div>
                </div>
              </div>
              <!-- <div class="form-input">
                <span><img style="" src="../assets/image/star.png" alt="">联系人-联系方式</span>
                <div class="comfirm-input-wrapper">
                  <div class="comfirm-input" v-for="(item,i) in form3.contectTelList" :key="i">
                    <van-field class="contect" v-model="item.name" type="text" placeholder="输入联系人" />-
                    <van-field class="tel" v-model="item.tel" type="text" placeholder="输入电话号码(建议手机)" @blur="checkTel(i,item.tel)" />
                    
                  </div>
                </div>
              </div> -->
              <div class="form-input">
                <span><img style="" src="../assets/image/star.png" alt="">服务提供类型</span>
                <div class="comfirm-radio">
                  <van-checkbox-group @change="changetype" v-model="form3.materialDetails1" class="radio-group">
                    <div class="sig-radio" v-for="(item,i) in luruOriginizeSupRadio" :key="i+item.name">
                    <van-checkbox shape="square" checked-color="#2D65E3" :name="item.name">{{item.name}}</van-checkbox>
                    </div>
                   </van-checkbox-group>
                  <div class="author">
                    <span>备注(若选择其他，请填写备注)</span>
                    <van-field v-model="form3.needsDescr" type="textarea" class="author-textarea" placeholder="请输入例如：枢纽组织" :error-message="errorMessage3.author"/>
                  </div>
                </div>
              </div>
              <div class="form-input">
                <span>其他说明</span>
                <van-field v-model="form3.descr" type="textarea" placeholder="请填写" />
              </div>
              <div class="form-input">
                <span><img style="" src="../assets/image/star.png" alt="">身份证明</span>
                <div class="need-img-wrapper">
                  <van-uploader
                    v-model="filst"
                    multiple
                    :after-read="saRead" 
                    @delete="sadelete"
                    :max-count="2"
                  />
                  
                </div>
                <span class="desc">企业提供方请上传营业执照照片，个人提供方请上传身份证正反面照片，最多可上传2张照片</span>
              </div>
              <div class="confirm-btn" @click="confirmthree">提交</div>
            </div>

          </div>
        </div>
        
        
      </div>
    </div>
</template> 

<script>
import json from "@/libs/city_code.json"
export default {
  data() {
    return {
      bannerback:"url("+require("../assets/image/banner.png")+")",
      showmaterial:false,
      focusa:false,
      materialin:"",
      allCity:json,
      materialData:[],
      showPicker:false,
      startTimePop3:false,
      startTimePop4:false,
      showPicker1:false,
      loadmaterial:false,
      testindex:0,
      testindex1:0,
      telindex:0,
      telindex1:0,
      telindex2:0,
      testnum:'',
      form1:{ // 录入表单
        selectItem:'',
        hispotalName:'',
        province:'',//省
        city:'',//市
        address:'',
        addressArr:[],
        addressDetail:"",
        materialDetails:[
          {
            needsName:'',
            needsNum:'',
          }
        ],//需求表
        type:4,
        sup:[],
        needList:{
            name:'',
            num:'',
        },
        contectTelList:[
            {
                name:'',
                tel:'',
            },
        ],
        longitude:'',
        latitude:'',
        descr:'',
        fileList:[],
        startTime:'',
        needOrgin:1,
        needImg:'',
      },
      errorMessage1:{
        hispotalName:'',
        address:'',
        addressDetail:"",
        type:'',
        sup:[],
        needList:{
            name:'',
            num:''
        },
        contectTelList:{
            name:'',
            tel:''
        },
        startTime:'',
        needOrgin:'',
        needImg:'',
      },
      searchid:-1,
      showresult:false,
      form2:{ // 录入表单
        selectItem:'',
        hispotalName:'',
        addressArr:[],
        province:'',//省
        city:'',//市
        address:'',
        addressDetail:"",
        type:3,
        sup:4,
        sup1:1,
        descr:'',
        materialDetails:[
          {
            needsName:'',
            needsNum:'',
          }
        ],//需求表
        needList:{
            name:'',
            num:''
        },
        contectTelList:[
            {
                name:'',
                tel:'',
            }
        ],
        longitude:'',
        latitude:'',
        fileList:[],
        startTime:'',
        needOrgin:'',
        needImg:'',
      },
      errorMessage2:{
        hispotalName:'',
        address:'',
        addressDetail:"",
        type:'',
        sup:'',
        needList:{
            name:'',
            num:'',
        },
        contectTelList:{
            name:'',
            tel:'',
        },
        startTime:'',
        needImg:'',
      },
      filst:[],
      form3:{ // 录入表单
        materialType:3,//民间组织
        name:'',//机构名称
        province:'',//省
        city:'',//市
        address2:'',
        address:'',//地址
        serviceRange:"",//覆盖范围
        picUrl:'',
        startTime:'',
        endTime:'',
        type:1,
        linkUrl:'',
        longitude:'',
        latitude:'',
        needsDescr:'',
        descr:'',//备注
       contectTelList:[
            {
                name:'',
                tel:'',
            }
        ],
        linkPeople:'',
        materialDetails:[],
        materialDetails1:[],
      },
      meedUrlArr:[],
      meedUrlArr1:[],
      meedUrlArr2:[],
      errorMessage3:{
        hispotalName:'',
        address:'',
        address2:'',
        addressDetail:"",
        serviceRange:'',
        rang:'',
        startTiTime:'',
        endTiTime:'',
        type:'',
        linkUrl:'',
        
        contectTelList:{
            name:'',
            tel:'',
        },
        startTime:'',
        supContect:[],
        author:'',
        authorWrite:'',
      },
      showimg:false,
      luruSelectData:[ //录入选择数据
        {
          name: "我有需求",
          type:1
        },{
          name: "我有物资",
          type:2
        },{
          name: "我要出力",
          type:3
        }
      ],
      luruTypeRadio:[ //录入类型单选数据
        {
          id:4,
          name:"定点医院"
        },{
          id:5,
          name:"发热门诊"
        },{
          id:6,
          name:"防控指挥部"
        },{
          id:7,
          name:"普通医院"
        },{
          id:0,
          name:"其他抗疫单位"
        },
      ], 
      luruTypeRadio1:[ //录入类型单选数据
        {
          id:3,
          name:"企业"
        },{
          id:8,
          name:"个人"
        },{
          id:9,
          name:"公益组织"
        },{
          id:10,
          name:"海外组织"
        },
      ], 
      luruSupRadio:[ //录入物资对接情况单选数据
        {
          id:1,
          name:"接受个人捐赠"
        },{
          id:2,
          name:"接受企业捐赠"
        },{
          id:3,
          name:"接受采购"
        },
      ], 
      luruSupRadio1:[ //录入物资对接情况单选数据
        {
          id:4,
          name:"捐赠"
        },{
          id:5,
          name:"采购"
        },
      ], 
      luruneedRadio:[ //录入需求来源单选数据
        {
          id:1,
          name:"是"
        },{
          id:0,
          name:"否"
        }
      ],
      luruSourceRadio:[ //录入需求来源单选数据
        {
          id:1,
          name:"政府发布"
        },{
          id:2,
          name:"医院官方渠道"
        },{
          id:3,
          name:"公益平台"
        },{
          id:4,
          name:"微信公众号"
        },{
          id:5,
          name:"其他"
        },
      ],
      currentDate:new Date(),
      startTime:'',
      minDate: new Date(),
      maxDate: new Date(2025, 10, 1),
      startTimePop:false,
      currentDate1:new Date(),
      startTimePopNeed:false,
      currentDateNeed:new Date(),
      currentDate3:new Date(),
      startTime1:'',
      minDate1: new Date(),
      startTimePop1:false,
      // curActiveIndex:0, // 录入头部切换当前index
      luruOriginizeTypeRadio:[ // 录入机构类型单选数据
        {
          id:1,
          name:"民间组织"
        },{
          id:2,
          name:"志愿者团队"
        },{
          id:3,
          name:"企业"
        },
      ],
      luruOriginizeSupRadio:[ // 录入机构类型单选数据
        {
          id:1,
          name:"医疗救助"
        },{
          id:2,
          name:"心理干预"
        },{
          id:3,
          name:"物资发放"
        },{
          id:4,
          name:"疫情排查"
        },{
          id:5,
          name:"宣传倡导"
        },{
          id:6,
          name:"社区服务"
        },{
          id:7,
          name:"其他服务"
        },
      ],
      columns:[
          
        {
            values: '',
            className: 'column1'
        },
        {
            values: '',
            className: 'column2',
            defaultIndex: 0
        },
      ],
      needList:["N95口罩","外科口罩","一次性医用口罩","隔离衣","一次性手术衣","医用帽","护目镜","防护眼罩","防护面罩","医用手套","防污染鞋套","长筒防护靴","测温仪","84消毒液","75%浓度酒精","一次性消毒床罩","消毒设备","对口药品","负压担架","负压救护车","消洗设备","全面型呼吸防护器","其他"],
      currentCity:[],
      startTimePopNeedName:false,
      selectIndex:0,
      selectIndex1:0,
      needWritePoint:0,
      needWritePoint1:0,
      params1:{},
      params2:{},
      readonly1:true,//需求表中输入框是否可读
      readonly2:true,//需求表中输入框是否可读
      curNeed1:0,// 当前选择需求为其他
      curNeed2:0,// 当前选择需求为其他
    };
  },
   props: {
      curTabIndex:Number,
      required: true,
    },
  created() {
  },
  watch:{
  },
 computed: {
  
 },
 mounted () {
  //  let interval
  //   $('input').focus(function(){
  //     interval = setInterval(function(){
  //     document.body.scrollTop = document.body.scrollHeight;
  //   },100)
  //   }).blur(function(){
  //     clearInterval(interval);
  //     document.body.scrollTop =scrolltop;
  //   });
    let pos = 0;
    // if ( $('input').selectionStart ==  $('input').selectionEnd) {
    //     pos = isNaN(temp) || 
    //        $('input').selectionStart % 5 != 0 || 
    //       val.length < old.length ?
    //        $('input').selectionStart :  $('input').selectionStart + 1;
    //   } else {
    //     pos = -1;
    //   }
    // this.$nextTick(() => {
    //   if (pos != -1) {
    //     this.$refs.focusa.setSelectionRange(pos, pos);
    //   }
    // });
     this.columns[0].values = Object.values(this.allCity).map(function(e){
        return {text:e.name}
    })
    // 默认展示二级的数据
    if (this.allCity[0].city){
        this.columns[1].values = Object.values(this.allCity[0].city).map(function(e){
            return {text:e.name}
        })
    }
  },
methods:{
  clearForm1(){
        this.form1.selectItem=''
        this.form1.hispotalName=''
        this.form1.province=''
        this.form1.city=''
        this.form1.address=''
        this.form1.addressArr=[]
        this.form1.addressDetail=''
        this.form1.materialDetails=[
          {
            needsName:'',
            needsNum:'',
          }
        ]
        this.form1.type=4
        this.form1.sup=[]
        this.form1.needList={
            name:'',
            num:'',
        },
        this.form1.contectTelList=[
            {
                name:'',
                tel:'',
            }
        ]
        this.form1.longitude=''
        this.form1.latitude=''
        this.form1.fileList=[]
        this.form1.startTime=''
        this.form1.needOrgin=1
        this.form1.needImg=''
        this.curNeed1=0
        this.testindex=0
        this.telindex=0

  },
  clearForm2(){

        this.form2.selectItem=''
        this.form2.hispotalName=''
        this.form2.addressArr=[]
        this.form2.province=''
        this.form2.city=''
        this.form2.address=''
        this.form2.addressDetail=''
        this.form2.type=3
        this.form2.sup=4
        this.form2.sup1=1
        this.form2.materialDetails=[
          {
            needsName:'',
            needsNum:'',
          }
        ]
        this.form2.needList={
            name:'',
            num:''
        }
        this.form2.contectTelList=[
            {
                name:'',
                tel:'',
            }
        ]
        this.form2.longitude=''
        this.form2.latitude=''
        this.form2.fileList=[]
        this.form2.startTime=''
        this.form2.needOrgin=''
        this.form2.needImg=''
        
        this.curNeed2=0
        this.testindex1=0
        this.telindex1=0

  },
  clearForm3(){
        this.form3.materialType=3
        this.form3.name=''
        this.form3.province=''
        this.form3.city=''
        this.form3.address2=''
        this.form3.address=''
        this.form3.serviceRange=""
        this.form3.picUrl=''
        this.form3.startTime=''
        this.form3.endTime=''
        this.form3.type=1
        this.form3.linkUrl=''
        this.form3.longitude=''
        this.form3.latitude=''
        this.form3.descr=''
        this.form3.contectTelList=[
            {
                name:'',
                tel:'',
            }
        ]
        this.form3.linkPeople=''
        this.form3.materialDetails=[]
        this.form3.materialDetails1=[]
        this.form3.needsDescr=''
        this.filst=[]
        this.telindex2=0
  },
  deleteTel(index){
      if(this.telindex<1){
        this.form1.contectTelList[index].name=''
        this.form1.contectTelList[index].tel=''
        this.$toast('至少添加一条联系人');
      }else{
        this.form1.contectTelList.splice(index,1)
        this.telindex--
      }

  },
  addTel(){
    let x=this.form1.contectTelList.some(item =>{
          return item.name == ""||item.tel == ""
      })
      if(x||this.form1.contectTelList[this.telindex].name==''||this.form1.contectTelList[this.telindex].tel==''){
        this.$toast('请完善信息');
      }else{
        this.telindex++
        this.form1.contectTelList.push({
          name:'',
          tel:'',
        })
      }

  },
  deleteTel1(index){
      if(this.telindex1<1){
        this.form2.contectTelList[index].name=''
        this.form2.contectTelList[index].tel=''
        this.$toast('至少添加一条联系人');
      }else{
        this.form2.contectTelList.splice(index,1)
        this.telindex1--
      }

  },
  addTel1(){
    let x=this.form2.contectTelList.some(item =>{
          return item.name == ""||item.tel == ""
      })
      if(x||this.form2.contectTelList[this.telindex1].name==''||this.form2.contectTelList[this.telindex1].tel==''){
        this.$toast('请完善信息');
      }else{
        this.telindex1++
        this.form2.contectTelList.push({
          name:'',
          tel:'',
        })
      }

  },
  deleteTel2(index){
      if(this.telindex2<1){
        this.form3.contectTelList[index].name=''
        this.form3.contectTelList[index].tel=''
        this.$toast('至少添加一条联系人');
      }else{
        this.form3.contectTelList.splice(index,1)
        this.telindex2--
      }

  },
  //物资的模糊搜做
  searchSaming(val,index){
    this.searchid=index
    if(val.length>1){
      this.showmaterial=true
      this.materialin=val
      this.getRemark()
      setTimeout(()=>{
        this.$refs.focusa.focus();
      },200)
      
    }
  },
  //模糊搜索的结果
  getRemark(){
    this.loadmaterial=true
    this.materialData=[]
     this.$fetchGet("material/getName",{
       name:this.materialin
     }).then(res=> {
       this.loadmaterial=false
        if(res.code=='success'){
          this.contentSearch(this.materialin,res.content)
        }
    })

  },
  //匹配关键字的问题
  contentSearch (value, array) {
      let arrayContent = array
      // 匹配关键字正则
      let replaceReg = new RegExp(value, 'g')
      // 高亮替换v-html值
      let replaceString = '<span class="search-text">' + value + '</span>'
      for (let i = 0; i < arrayContent.length; i++) {
        let titleString = arrayContent[i]
        if (!titleString.name) {
          return ''
          }
        if (value && value.length > 0) {
          // 开始替换
            titleString.name = titleString.name.replace(replaceReg, replaceString)
          }

          this.materialData.push(titleString)
      }
  },
  submit(val){
    if(val==''){
      this.showmaterial=false
    }else{
      switch(this.searchid) {
        case 1:
          this.form1.hispotalName=val.replace('<span class="search-text">', "").replace('</span>', "")
            break;
        case 2:
          this.form2.hispotalName=val.replace('<span class="search-text">', "").replace('</span>', "")
            break;
        case 3:
            this.form3.name=val.replace('<span class="search-text">', "").replace('</span>', "")
            break;
        default:
          
      } 
       this.showmaterial=false
    }
    
  },
  addTel2(){
    let x=this.form3.contectTelList.some(item =>{
          return item.name == ""||item.tel == ""
      })
      if(x||this.form3.contectTelList[this.telindex2].name==''||this.form3.contectTelList[this.telindex2].tel==''){
        this.$toast('请完善信息');
      }else{
        this.telindex2++
        this.form3.contectTelList.push({
          name:'',
          tel:'',
        })
      }

  },
//关闭弹窗
closebig(){
  this.$emit('fatherMethod');
},
//地址解析
addresschange(address){
  var geocoder = new AMap.Geocoder();
  geocoder.getLocation(address, (status, result)=> {
      if (status === 'complete'&&result.geocodes.length) {
       
        let lnglat = result.geocodes[0].location
        //  return lnglat
         this.form3.longitude=lnglat.lng
         this.form3.latitude=lnglat.lat
         this.$fetchPost("material/save",this.form3,'json').then(res=> {
            if(res.code=="success"){
              this.showresult=true
              this.clearForm3()
            }else{
              this.$toast(res.message);
            }
        })
         
      }else{
          // log.error('根据地址查询位置失败');
      }
  });
},
cancleNeedName(){
  this.startTimePopNeedName=false
},
changeNeedName(picker, value, index){
  this.form1.selectItem=value
},
confirmNeedName1(value){
  
  if(value=="其他"){
    this.curNeed2=1
    this.readonly2=false
    this.form2.materialDetails[this.selectIndex1].needsName=''
    this.$toast("请输入其他物资名称")
  }else {
    this.form2.materialDetails[this.selectIndex1].needsName=value
  }
  this.startTimePopNeedName=false
},
cancleNeedName1(){
  this.startTimePopNeedName=false
},
changeNeedName1(picker, value, index){
  this.form2.selectItem=value
},
linkTelBlur(type,tel,index){
      
      var strTel=/^[\d\-]+$/g
        if (!strTel.test(tel)){
          if (type==1){
            this.form1.contectTelList[index].tel=''
          }else if(type==2){
            this.form2.contectTelList[index].tel=''
            
          }else if(type==3){
            this.form3.contectTelList[index].tel=''
            
          }
            this.$toast('当前填写电话格式有误')
        }
    },
    secectRadio(index){
        this.form1.type=index
    },
    onConfirm(value){
        this.showPicker=false
        this.form1.address=value[0].text+value[1].text
        this.form1.province=value[0].text
        this.form1.city=value[1].text
    },
    onConfirm1(value){
        this.showPicker1=false
        this.form2.address=value[0].text+value[1].text
        this.form2.province=value[0].text
        this.form2.city=value[1].text
    },
    //验证手机号的格式
    checkTel(index,tel)
      {
        var strTel=/^[\d\-]+$/g
        if (!strTel.test(tel)){
            this.form3.contectTelList[index].tel=""
            this.$toast('当前填写电话格式有误')
        }
      },
      confirmNeedName(value){
        if(value=="其他"){
          this.curNeed1=1
          this.readonly1=false
          this.form1.materialDetails[this.selectIndex].needsName=''
          this.$toast("请输入其他物资名称")
        }else {
          this.form1.materialDetails[this.selectIndex].needsName=value
        }
        this.startTimePopNeedName=false
      },
      needBlur(index){
        this.curNeed1=0
      },
      needBlur1(index){
        this.curNeed2=0
      },
      needFocus(index){
        if (this.curNeed1){
          this.readonly1=false
          this.startTimePopNeedName=false
        }else {
          if (this.form1.materialDetails[index].needsName) {
            this.needList.forEach(v=> {
              if (this.form1.materialDetails[index].needsName==v){
                this.readonly1=true
                this.startTimePopNeedName=true
              }else {
                this.readonly1=false
              }
            })
          } else {
            this.readonly1=true
            this.startTimePopNeedName=true
          }
        }
        this.curNeed1=0
        this.selectIndex=index
      },
    //添加需求表
    addDemand(){
      
      this.curNeed1=0
      let x=this.form1.materialDetails.some(item =>{
          // return item.needsName == ""||item.needsNum == ""
          return item.needsName == ""
      })
      if(x||this.form1.materialDetails[this.testindex].needsName==''){
        this.$toast('请完善信息(至少输入物资名称)');
      }else{
        this.testindex++
        this.form1.materialDetails.push({
          needsName:'',
          needsNum:'',
        })
      }
    },
      needFocus1(index){
        if (this.curNeed2){
          this.readonly2=false
          this.startTimePopNeedName=false
        }else {
          if (this.form2.materialDetails[index].needsName) {
            this.needList.forEach(v=> {
              if (this.form2.materialDetails[index].needsName==v){
                this.readonly2=true
                this.startTimePopNeedName=true
              }else {
                this.readonly2=false
              }
            })
          } else {
            this.readonly2=true
            this.startTimePopNeedName=true
          }
        }
        this.curNeed2=0
        this.selectIndex1=index
      },
    //删除需求表
    deleteDemand(index){
      if(this.testindex<1){
        this.form1.materialDetails[index].needsName=''
        this.form1.materialDetails[index].needsNum=''
        this.$toast('至少添加一条需求');
      }else{
        this.form1.materialDetails.splice(index,1)
        this.testindex--
      }
      
    },
    //添加需求表
    addDemand1(){
      this.curNeed2=0
      let x=this.form2.materialDetails.some(item =>{
          return item.needsName == ""||item.needsNum == ""
      })
      if(x||this.form2.materialDetails[this.testindex1].needsName==''||this.form2.materialDetails[this.testindex1].needsNum==''){
        this.$toast('请完善信息');
      }else{
        this.testindex1++
        this.form2.materialDetails.push({
          needsName:'',
          needsNum:'',
        })
      }
    },
    //删除需求表
    deleteDemand1(index){
      if(this.testindex1<1){
        this.form2.materialDetails[index].needsName=''
        this.form2.materialDetails[index].needsNum=''
        this.$toast('至少添加一条需求');
      }else{
        this.form2.materialDetails.splice(index,1)
        this.testindex1--
      }
    },
      
    //民间组织添加省市
    onConfirm3(value){
      this.showPicker=false
      this.form3.address2=value[0].text+value[1].text
      this.form3.province=value[0].text
      this.form3.city=value[1].text
    },
    //民间组织选择时间
    quemsg(val){
      this.startTimePop3 = false
      this.form3.startTime=this.utiltime(val)
    },
    // 民间组织选择时间
    quemsg2(val) {
      this.startTimePop4 = false;
     this.form3.endTime=this.utiltime(val)
    },
    //服务提供类型
    changetype(){
    },
    //格式化时间
    utiltime(date){
      let nstr = new Date(date) //当天时间
      let now_year = nstr.getFullYear() //年份
      let now_month =
        nstr.getMonth() + 1 < 10
          ? '0' + (nstr.getMonth() + 1)
          : nstr.getMonth() + 1 //月份
      let now_day = nstr.getDate() < 10 ? '0' + nstr.getDate() : nstr.getDate() //日期
      return (
        now_year +
        '-' +
        now_month +
        '-' +
        now_day
      )
    },
    confirmTime31(val){
    },
    onChange(picker, values,index){
          picker.setColumnValues(1,this.cityDate(this.allCity,values[0].text))
          
        this.form1.addressArr=values
    }, 
    onChange1(picker, values,index){
          picker.setColumnValues(1,this.cityDate(this.allCity,values[0].text))
          
        this.form2.addressArr=values
    }, 
    cityDate(data,province){
          var x=[]
          data.forEach(function(res){
              if (res.city){
                  if(res.name == province){
                      for (let i = 0; i < res.city.length; i++) {
                          let obj = {}
                          obj.text = res.city[i].name
                          x.push(obj);
                      }
          
                      
                  }
              }
          })
          return x
      },
    onCancel(){
        this.showPicker=false
    },
    onCancel1(){
        this.showPicker1=false
    },
    // 录入需求提供切换
    needTi(type){
      this.curTabIndex=type
    },
    //民间组织录入身份证明
    uploadImgsa (file) {
        let formdata1 = new FormData();
        formdata1.append('files', file);
        this.$fetchPost("material/uploadPicFiles",{
          ImgBytes:file
        },"json").then(res=> {
            this.$toast("图片上传成功");
            if(res.code=='success'){
              this.meedUrlArr.push(res.content)
              this.meedUrlArr.forEach(item => {

                item=item.split(',')
              })
              this.meedUrlArr = (this.meedUrlArr + '').split(',');
              this.meedUrlArr = this.meedUrlArr.toString().split(',');
              this.meedUrlArr = this.meedUrlArr.join().split(',');
              
            }
            this.showimg=false
            
        })
    },
    saRead(val){
      // if (val.file.type!=="image/jpeg"&&val.file.type!=="image/jpg"&&val.file.type!=="image/png"){
      //   this.$toast("只能上传图片(注：格式为png,jpeg,jpg)")
      // } else {
        let selectImg=[]
        this.showimg=true
        if (val&&!Array.isArray(val)){   
          val=[val]

        }
        
        val.forEach(item => {
          let obj={}
          lrz(item.file, {
            quality: 0.2    //自定义使用压缩方式
          })  
          .then(rst=> {
              //成功时执行
            let file = new window.File([rst.file], item.file.name, {
                type: item.file.type
            }) //把blob转化成file
            let reader = new FileReader();    //html5读文件

            reader.readAsDataURL(file); //转BASE64 
            let that=this
            reader.onload = function (e) {        //读取完毕后调用接口

              obj={
                ImgByte: e.target.result
              }
              selectImg.push(obj)
              if(val.length>0&&val.length==selectImg.length){
                  that.uploadImgsa(selectImg)
                }
            }

              
          }).catch(error=> {
              //失败时执行
          }).always(()=> {
        
              //不管成功或失败，都会执行
          })
        })
     
      // }
      
    },
    //删除图片的回调
    sadelete(val,detail){
      if (this.meedUrlArr&&this.meedUrlArr.length){
        this.meedUrlArr.forEach(item => {

          item=item.split(',')
        })
        this.meedUrlArr = (this.meedUrlArr + '').split(',');
        this.meedUrlArr = this.meedUrlArr.toString().split(',');
        this.meedUrlArr = this.meedUrlArr.join().split(',');
        
        this.$toast("图片删除成功");
        this.meedUrlArr.splice(detail.index, 1)
      
      }

    },
    confirmthree(){

      let arr=[]
      let y=this.form3.contectTelList.some(item =>{
          return item.tel == ""||item.name=='' //返回true
      })
      if(this.form3.name==""||this.form3.province==""||this.form3.city==""
      ||this.form3.address==""||this.form3.serviceRange==""||
      this.form3.startTime==""||this.form3.endTime==""||this.form3.materialDetails1.length==0||this.meedUrlArr.length==0){
        this.$toast('请完善信息');
      }else if (y){
        this.$toast('请输入联系人、联系电话且相互对应');
      }else{
        this.form3.materialDetails1.forEach(iteam=>{
          let obj={}
          if(iteam=="其他服务"){
            obj.needsName=iteam
            obj.needsNum=null
            obj.descr=this.form3.needsDescr
          }else{
            obj.needsName=iteam
            obj.needsNum=null
            obj.descr=null
          }
          this.form3.materialDetails.push(obj)
          
        }),
        this.form3.contectTelList.forEach(item=>{
          if(item.tel!==''){
            arr.push(item.name+":"+item.tel)
          }
        }),
        this.form3.linkPeople=arr.join(",")
        this.form3.picUrl=this.meedUrlArr.join(",")
        this.addresschange(this.form3.province+this.form3.city+this.form3.address)
        
      }
    },
    //民间组织录入身份证明
    uploadImg (file) {
        let formdata1 = new FormData();
        formdata1.append('files', file);
        this.$fetchPostFile("material/uploadPicFiles",formdata1).then(res=> {
            this.$toast(res.message);
            if(res.code=='success'){
              this.meedUrlArr.push(res.content)
              
            }
            this.showimg=false
        })
    },
    //需求方录入需求证明
    uploadImg1 (file) {
        let formdata1 = new FormData();
        formdata1.append('files', file);
        this.$fetchPost("material/uploadPicFiles",{
          ImgBytes:file
        },"json").then(res=> {
            this.$toast(res.message);
            if(res.code=='success'){
              this.meedUrlArr1.push(res.content)
              
              this.meedUrlArr1.forEach(item => {

                item=item.split(',')
              })
              this.meedUrlArr1 = (this.meedUrlArr1 + '').split(',');
              this.meedUrlArr1 = this.meedUrlArr1.toString().split(',');
              this.meedUrlArr1 = this.meedUrlArr1.join().split(',');
              
            }
            this.showimg=false
        })

    },
    //提供方录入身份证明
    uploadImg2 (file) {
        let formdata1 = new FormData();
        formdata1.append('files', file);
        this.$fetchPost("material/uploadPicFiles",{
          ImgBytes:file
        },"json").then(res=> {
            this.$toast(res.message);
            if(res.code=='success'){
              this.meedUrlArr2.push(res.content)
              this.meedUrlArr2.forEach(item => {

                item=item.split(',')
              })
              this.meedUrlArr2 = (this.meedUrlArr2 + '').split(',');
              this.meedUrlArr2 = this.meedUrlArr2.toString().split(',');
              this.meedUrlArr2 = this.meedUrlArr2.join().split(',');

              
            }
            this.showimg=false
        })
    },
    xuRead(val){
      // if (val.file.type!=="image/jpeg"&&val.file.type!=="image/jpg"&&val.file.type!=="image/png"){
      //   this.$toast("只能上传图片(注：格式为png,jpeg,jpg)")
      // }else {

        let selectImg=[]
        this.showimg=true
        if (val&&!Array.isArray(val)){   
          val=[val]

        }
        
        val.forEach(item => {
          let obj={}
          lrz(item.file, {
            quality: 0.2    //自定义使用压缩方式
          })  
          .then(rst=> {
              //成功时执行
            let file = new window.File([rst.file], item.file.name, {
                type: item.file.type
            }) //把blob转化成file
            let reader = new FileReader();    //html5读文件

            reader.readAsDataURL(file); //转BASE64 
            let that=this
            reader.onload = function (e) {        //读取完毕后调用接口

              obj={
                ImgByte: e.target.result
              }
              selectImg.push(obj)
              if(val.length>0&&val.length==selectImg.length){
                  that.uploadImg1(selectImg)
                }
            }

              
          }).catch(error=> {
              //失败时执行
          }).always(()=> {
        
              //不管成功或失败，都会执行
          })
        })
      // }
    },
    tiRead(val){
      // if (val.file.type!=="image/jpeg"&&val.file.type!=="image/jpg"&&val.file.type!=="image/png"){
      //   this.$toast("只能上传图片(注：格式为png,jpeg,jpg)")
      // }else {
        
        let selectImg=[]
        this.showimg=true
        if (val&&!Array.isArray(val)){   
          val=[val]

        }
        
        val.forEach(item => {
          let obj={}
          lrz(item.file, {
            quality: 0.2    //自定义使用压缩方式
          })  
          .then(rst=> {
              //成功时执行
            let file = new window.File([rst.file], item.file.name, {
                type: item.file.type
            }) //把blob转化成file
            let reader = new FileReader();    //html5读文件

            reader.readAsDataURL(file); //转BASE64 
            let that=this
            reader.onload = function (e) {        //读取完毕后调用接口

              obj={
                ImgByte: e.target.result
              }
              selectImg.push(obj)
              if(val.length>0&&val.length==selectImg.length){
                  that.uploadImg2(selectImg)
                }
            }

              
          }).catch(error=> {
              //失败时执行
          }).always(()=> {
        
              //不管成功或失败，都会执行
          })
        })

      // }
    },
    //删除图片的回调
    xudelete(val,detail){
      if (this.meedUrlArr1&&this.meedUrlArr1.length){
        this.meedUrlArr1.forEach(item => {

          item=item.split(',')
        })
        this.meedUrlArr1 = (this.meedUrlArr1 + '').split(',');
        this.meedUrlArr1 = this.meedUrlArr1.toString().split(',');
        this.meedUrlArr1 = this.meedUrlArr1.join().split(',');
        
        this.$toast("图片删除成功");
        this.meedUrlArr1.splice(detail.index, 1)
      
      }
      
    },
    //删除图片的回调
    tidelete(val,detail){
      if (this.meedUrlArr2&&this.meedUrlArr2.length){
        this.meedUrlArr2.forEach(item => {

          item=item.split(',')
        })
        this.meedUrlArr2 = (this.meedUrlArr2 + '').split(',');
        this.meedUrlArr2 = this.meedUrlArr2.toString().split(',');
        this.meedUrlArr2 = this.meedUrlArr2.join().split(',');
        
        this.$toast("图片删除成功");
        this.meedUrlArr2.splice(detail.index, 1)
      
      }
    },
    confirmone(){
      let linkPeopleArr=[],fileImgArr=[]
      let x=this.form1.materialDetails.some(item =>{
          // return item.needsName == ""||item.needsNum == "" //返回true
          return item.needsName == "" //返回true
      })
      let y=this.form1.contectTelList.some(item =>{
          return item.tel == ""||item.name=='' //返回true
      })
        if (this.form1.hispotalName==""||this.form1.province==""||this.form1.city==""|| this.form1.addressDetail==""||this.form1.sup.length==0||x||this.form1.startTime==""||this.meedUrlArr1.length==0){
            this.$toast('请完善信息');
        }else if (y){
        this.$toast('请输入联系人、联系电话且相互对应');
      }else{
         this.form1.contectTelList.forEach(v=> {
           if (v.tel||v.name&&v.tel){
            linkPeopleArr.push(v.name+":"+v.tel)
           }
         })
          this.params1= { 
            materialType:1,
            name:this.form1.hispotalName,
            province:this.form1.province,
            city:this.form1.city,
            address:this.form1.addressDetail,
            materialDetails:this.form1.materialDetails,//需求表
            type:this.form1.type,
            status:this.form1.sup.join(","),
            linkPeople:linkPeopleArr.join(','),
            createTime:this.form1.startTime,
            source:this.form1.needOrgin,
            picUrl:this.meedUrlArr1.join(','),
              longitude:'',
              latitude:'',
      
          }
            this.addresschange1(this.params1.province+this.params1.city+this.params1.address,1)
        }
         
    },
    confirmtwo(){
      let linkPeopleArr=[],fileImgArr=[]
         
      let x=this.form2.materialDetails.some(item =>{
          return item.needsName == ""||item.needsNum == "" //返回true
      })
      let y=this.form2.contectTelList.some(item =>{
          return item.tel == ""||item.name=='' //返回true
      })
      if (this.form2.hispotalName==""||this.form2.province==""||this.form2.city==""|| this.form2.addressDetail==""||x||this.form2.startTime==""||this.meedUrlArr2.length==0){
          this.$toast('请完善信息');
      }else if (y){
        this.$toast('请输入联系人、联系电话且相互对应');
      }else{
         this.form2.contectTelList.forEach(v=> {
           if (v.tel||v.name&&v.tel){
            linkPeopleArr.push(v.name+":"+v.tel)
           }
         })
            this.params2= { 
              materialType:2,
              name:this.form2.hispotalName,
              province:this.form2.province,
              city:this.form2.city,
              address:this.form2.addressDetail,
              materialDetails:this.form2.materialDetails,//需求表
              type:this.form2.type,
              status:this.form2.sup,
              isLogistics:this.form2.sup1,
              linkPeople:linkPeopleArr.join(','),
              createTime:this.form2.startTime,
              picUrl:this.meedUrlArr2.join(","),
              longitude:'',
              latitude:'',
        
            }
            this.addresschange1(this.params2.province+this.params2.city+this.params2.address,2)
      }
          
    },
    //地址解析
    addresschange1(address,type){
      var geocoder = new AMap.Geocoder();
      geocoder.getLocation(address, (status, result)=> {
          if (status === 'complete'&&result.geocodes.length) {
          
            let lnglat = result.geocodes[0].location
            //  return lnglat
            if (type==1){
              this.params1.longitude=lnglat.lng
              this.params1.latitude=lnglat.lat
              this.$fetchPost("material/save",this.params1,'json').then(res=> {
                  this.$toast(res.message);
                  if(res.code=="success"){
                    this.showresult=true
                    this.clearForm1()
                  }
              })
            }else if (type==2){
              this.params2.longitude=lnglat.lng
              this.params2.latitude=lnglat.lat
              this.$fetchPost("material/save",this.params2,'json').then(res=> {
                  this.$toast(res.message);
                  if(res.code=="success"){
                    this.showresult=true
                    this.clearForm2()
                  }
              })
            }
            
          }else{
              // log.error('根据地址查询位置失败');
          }
      });
    },
    // 点击确定
    confirmTime() {
        let MM=(Number(this.currentDate.getMonth()) + 1)>=10?(Number(this.currentDate.getMonth()) + 1):'0'+(Number(this.currentDate.getMonth()) + 1)
        let dd=this.currentDate.getDate()>=10?this.currentDate.getDate():'0'+this.currentDate.getDate()
      this.startTimePop = false;
      this.form1.startTime =
        this.currentDate.getFullYear() +
        "-" +
        MM +
        "-" +
        dd
    },
    // 点击取消
    cancelTime() {
      this.startTimePop = false;
    },
    
    // 点击确定
    confirmTimeNeed() {
        
        let MM=(Number(this.currentDateNeed.getMonth()) + 1)>=10?(Number(this.currentDateNeed.getMonth()) + 1):'0'+(Number(this.currentDateNeed.getMonth()) + 1)
        let dd=this.currentDateNeed.getDate()>=10?this.currentDateNeed.getDate():'0'+this.currentDateNeed.getDate()
      this.startTimePopNeed = false;
      this.form2.startTime =
        this.currentDateNeed.getFullYear() +
        "-" +
        MM +
        "-" +
        dd
    },
    // 点击取消
    cancelTimeNeed() {
      this.startTimePopNeed = false;
    },
    // 处理控件显示的时间格式
    formatter(type, value) {
      // 格式化选择器日期
      if (type === "year") {
        return `${value}年`;
      } else if (type === "month") {
        return `${value}月`;
      } else if (type === "day") {
        return `${value}日`;
      }
      return value;
    },
    // 点击取消
    cancelTime() {
      this.startTimePop = false;
    },
    
    // 点击确定
    confirmTime2() {
      this.startTimePop = false;
      this.startTime =
        this.currentDate.getFullYear() +
        "-" +
        (Number(this.currentDate.getMonth()) + 1) +
        "-" +
        this.currentDate.getDate()
    },
    // 点击确定
    confirmTime1() {
      this.startTimePop = false;
      this.startTime =
        this.currentDate.getFullYear() +
        "-" +
        (Number(this.currentDate.getMonth()) + 1) +
        "-" +
        this.currentDate.getDate()
    },
    
    // 点击确定
    ddd() {
      this.startTimePop = false;
      this.startTime =
        this.currentDate.getFullYear() +
        "-" +
        (Number(this.currentDate.getMonth()) + 1) +
        "-" +
        this.currentDate.getDate()
    },
    // 处理控件显示的时间格式
    formatter1(type, value) {
      // 格式化选择器日期
      if (type === "year") {
        return `${value}年`;
      } else if (type === "month") {
        return `${value}月`;
      } else if (type === "day") {
        return `${value}日`;
      }
      return value;
    },
    // 点击取消
    cancelTime1() {
      this.startTimePop = false;
    },
  }
};
</script>
<style>
.search-text{
  color:#07c160;
}
.header-box .van-field__body{
  justify-content:flex-start;
}
</style>
<style lang="scss" scoped>
.luru{
  position:relative;
  .material-content{
    width:100%;
    height:100%;
    display:flex;
    flex-direction: column;
    
    .header-box{
      width:100%;
      height:62px;
      display:flex;
      justify-content: space-between;
      align-items:center;
      box-sizing:border-box;
      padding:0 10px;
      
      .searchfone{
        display:inline-block;
        padding:4px 12px;
        background:#07c160;
        font-size:15px;
        color:#fff;
        border-radius:6px;
      }
    }
    .content-box{
      flex:1;
      overflow:hidden;
      overflow-y:scroll;
      text-align:left;
      .content-item{
        font-size:14px;
        box-sizing:border-box;
        padding: 8px 14px;
        border-bottom:1px solid #eeeeee;
        color:#666666;
      }
      .conme{
        display:flex;
        justify-content: center;
        align-items:center;
        box-sizing:border-box;
      }
    }
  }
  .wrapperfast{
     display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
  .reduce-content{
    background:#2D65E3;
    padding-bottom:40px;
    .banner{
      width:100%;
      height: 125px;
      
      background-size: 100% 100%;
    }
    .us-need-wrapper{
      margin: 0 12px;
      .us-need{
        background:#174FCE;
        border-radius:8px;
        margin-bottom: 15px;
        &.us{}
        &.need{}
        .title{
          display:flex;
          justify-content: center;
          align-items:center;
          height: 46px;
          font-size:17px;
          font-family:PingFang SC;
          font-weight:bold;
          color:rgba(255,255,255,1);
          color: #fff;
          .dot{
            width: 5px;
            height: 5px;
            border-radius: 50%;
            background: #fff;
            margin-left: 3px;
          }
          .title-name{
            padding: 0 10px;
          }
        }
        .tab-btn {
          display:flex;
          justify-content: space-between;
          align-items:center;
          height: 40px;
          span{
            width: 33%;
            font-size:16px;
            text-align: center;
            line-height: 40px;
            font-family:PingFang SC;
            font-weight:bold;
            color:rgba(80,133,252,1);
            // border-left: 1px solid #f1f1f1;
            // border-right: 1px solid #f1f1f1;
            background: #0F46C0;
            &:last-child{
              border-right: 0;
            }
            &:first-child{
              border-left: 0;
            }
            &.active{
              background: #174FCE;
              color: #fff;
              border: 0;
            }
          }
        }
        .message{
          display:flex;
          justify-content: space-between;
          align-items:center;
          margin: 0 29px;
          padding: 10px;
          font-size:15px;
          font-family:PingFang SC;
          font-weight:500;
          color:rgba(232,245,255,1);
          background: #3A6FE5;
          border-radius: 3px;
          // border-top-left-radius: 3px;
          // border-top-right-radius: 3px;
          // &:first-child {
            margin-bottom:1px;
            // border-bottom-right-radius: 3px;
            // border-bottom-left-radius: 3px;
          // }
          .message-content{
            display:flex;
            flex-direction: column;
            justify-content: flex-start;
            .name-tel{
            display:flex;
            justify-content: flex-start;
              .name{}
              .tel{
                padding-left: 10px;
              }
            }
            .job{
              font-size: 13px;
              text-align:left;
            }
          }
          .btn{
            display:flex;
            justify-content: center;
            align-items:center;
            width: 86px;
            height: 32.5px;
            background:url("../assets/image/block.png") no-repeat;
            background-size: 86px 32.5px;
            font-weight:bold;
            font-style:italic;
            
          }
        }
        .code{
            display:flex;
            flex-direction:column;
            justify-content: center;
            align-items:center;
            padding-bottom: 18.5px;
          img{
            width: 63px;
            height: 63px;
            margin:10px 0;
          }
          .btn{
            font-size:12px;
            font-family:PingFang SC;
            font-weight:500;
            color:rgba(255,255,255,1);
          }
        }
        .form-wrapper{
          padding: 0 18.5px 30px;
          .van-cell{
            border-radius: 5px;
          }
          .form-input{
            display:flex;
            flex-direction:column;
            text-align: left;
            font-size:14px;
            font-family:PingFang SC;
            font-weight:500;
            color:rgba(255,255,255,1);
            span{
              height: 39px;
              line-height: 39px;
              img{
                width: 10px;
                height: 10px;
                padding-right: 8px;
              }
            }
            .comfirm-radio{
              background: #fff;
              border-radius: 5px;
              padding: 6px 10px;
              .radio-group{
                display:flex;
                flex-wrap: wrap;
                justify-content: space-between;
                .sig-radio{
                  width: 50%;
                  padding: 6px 0;
                }
              }
              .author{
                span{
                  font-size:13px;
                  font-family:PingFang SC;
                  font-weight:500;
                  color:rgba(153,153,153,1);
                }
                .author-textarea{
                  background: #F2F2F2;
                }
              }
            }
            .comfirm-input-wrapper{
              .comfirm-input{
                display:flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom:10px;
                &:last-child{
                  margin-bottom:0;
                }
                .contect{
                  width: 105px;
                }
                .tel{
                  width: 192px;
                }
              }
            }
            .comfirm-need-input-wrapper{
              background:#fff;
              border-radius: 5px;
              font-size:15px;
              font-family:PingFang SC;
              font-weight:400;
              color:rgba(51,51,51,1);
              .comfirm-need-top{
                .name{
                  display: flex;
                  justify-content: center;
                  align-items:center;
                  width: 189px;
                  border-right: 1px solid #F1F2F5;
                }
                .num{
                  display: flex;
                  justify-content: center;
                  align-items:center;
                  width: 124px;
                }
                &.comfirm-need-top-tel{
                  .name{
                    display: flex;
                    justify-content: center;
                    align-items:center;
                    width: 104px;
                    border-right: 1px solid #F1F2F5;
                  }
                  .num{
                    display: flex;
                    justify-content: center;
                    align-items:center;
                    width: 209px;
                  }

                }
                .comfirm-need-head{
                  display: flex;
                  justify-content: flex-start;
                  height: 30px;
                  background:#E5EAF2;
                  border-top-left-radius:5px;
                  border-top-right-radius:5px;
                  border-bottom: 1px solid #F1F2F5;
                  .name{}
                  .num{}
                }
                .comfirm-need-body{
                  display: flex;
                  justify-content: flex-start;
                  border-bottom: 1px solid #F1F2F5;
                  .name{
                    .sup-name{}
                  }
                  .num {
                    display: flex;
                    justify-content: center;
                    align-items:center;
                    .sup-num,.sup-name {
                      text-align:center;
                    }
                    img{
                      width:15px;
                      height: 15px;
                      padding-right: 5px;
                    }
                  }
                  
                }
              }
              .comfirm-need-bottom{
                height: 30px;
                display: flex;
                justify-content:center;
                align-items:center;
                font-size:15px;
                font-family:PingFang SC;
                font-weight:500;
                color:rgba(102,102,102,1);
                img{
                  width: 15px;
                  height: 15px;
                  margin-right:5px;
                }
              }
            }
            .need-img-wrapper{
              display:flex;
              justify-content: flex-start;
              img{
                width:44px;
                height:44px;
                border-radius:5px;
                margin-right: 5px;
              }
            }
            .desc{
              font-size:12px;
              font-family:PingFang SC;
              font-weight:500;
              color:rgba(118,160,255,1);
              line-height: 14px;
              &.need-table-desc{
                height:20px;
                margin-top: 5px;

              }
            }
          }
          .confirm-btn{
            width:150px;
            height:44px;
            text-align: center;
            line-height: 44px;
            color:#fff;
            font-size:18px;
            font-family:PingFang SC;
            font-weight:bold;
            background:linear-gradient(270deg,rgba(255,145,0,1) 0%,rgba(255,126,0,1) 53%,rgba(255,145,0,1) 100%);
            box-shadow:0px 0px 5px 0px rgba(0, 0, 0, 0.05);
            border-radius:22px;
            margin: 30px auto 0;
          }
        }
      }
    }
    // display: flex;
    // flex-direction: column;
    // justify-content: center;
    // align-items: center;
    // margin-top: 100px;
    // img{
    //   width: 194px;
    //   height:147px;
    // }
    // p{
    //   font-size:15px;
    //   font-family:PingFang SC;
    //   font-weight:400;
    //   color:rgba(153,153,153,1);
    //   margin-top:23px;
    // }
  }
}
</style>